import React, { ForwardedRef, forwardRef, useState } from 'react';
import { Select } from 'antd';

interface IProps {
  valueEnum?: { label: string; value: any }[];
  onSearch?: any;
  search?: { when: 'open' | 'input'; label: string; value: string };
}

const ISelect = forwardRef((props: IProps, ref: ForwardedRef<any>) => {
  const { valueEnum, onSearch, search } = props;
  const [lock, setLock] = useState(false); // select搜索组件在下拉框关闭时会清除掉输入的内容并发起请求，为避免这一无效请求，对请求条件设置锁，只有在下拉框打开的条件下才能发起请求
  const [options, setOptions] = useState({ data: valueEnum || [], loading: false });

  /**
   * search request
   * @param value
   */
  const fetchData = async (value?: string | number) => {
    if (typeof onSearch !== 'function') return;

    setOptions({ loading: true, data: [] });
    try {
      const list = await onSearch(value);
      let result = list;
      if ((search.label && search.label !== 'label') || (search.value && search.value !== 'value')) {
        result = list.map((l) => ({ label: l[search.label], value: l[search.value] }));
      }
      setOptions((val) => ({ ...val, data: result, loading: false }));
    } catch (e) {
      setOptions({ loading: false, data: [] });
    }
  };

  return (
    <Select
      ref={ref}
      {...props}
      loading={options.loading}
      onDropdownVisibleChange={async (open) => {
        if (typeof onSearch !== 'function') return;

        if (open) {
          setLock(false);
          setOptions({ loading: false, data: [] });
          if (search.when === 'open') {
            await fetchData();
          }
        } else {
          setLock(true);
        }
      }}
      onSearch={async (value) => {
        if (typeof onSearch !== 'function') return;
        // 搜索发起时机配置为open时代表onDropdownVisibleChange open=true时发起搜索请求
        if (lock || search.when === 'open') return;

        await fetchData(value);
      }}
    >
      {options.data.map((v) => (
        <Select.Option key={v.value} value={v.value}>
          {v.label}
        </Select.Option>
      ))}
    </Select>
  );
});

export default ISelect;
