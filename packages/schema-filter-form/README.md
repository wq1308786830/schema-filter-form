# `@schema-forms/filter-form`

> 本组件用来提供基于antd@3的schema配置化表单搜索组件参考procomponents的属性参数，完全兼容antd@3的组件属性以及其本身支持的所有属性

## Usage
| 参数            | 说明         | 类型                                                | 默认值     |     |
|---------------|------------|---------------------------------------------------|---------|-----|
| dataIndex     | 字段id       | string                                            |         |     |
| title         | 字段名        | string                                            |         |     |
| valueType     | 组件类型       | 'input','select','radio','checkbox','dadtepicker' | 'input' |     |
| formItemProps | 表单项属性      |                                                   |         |     |
| fieldProps    | 表单项的输入组件属性 |                                                   |         |     |

- formItemProps，兼容透传antd@v3的Form.Item以及getFieldDecorator(id, options)的所有属性及其本身支持的所有属性，其中getFieldDecorator(id, options)的id于options重的所有属性都集合在formItemProps同一层级中，另外有额外参数如下：

| 参数        | 说明                                | 类型               | 默认值 |     |
|-----------|-----------------------------------|------------------|-----|-----|
| valueEnum | 'select','radio','checkbox'所用的可选项 | 参考antd@v3 Select |     |     |

- fieldProps，兼容透传antd@v3输入组件的各种属性以及其本身支持的所有属性，另有如下：

| 参数       | 说明                                                                            | 类型                                                       | 默认值 |     |
|----------|-------------------------------------------------------------------------------|----------------------------------------------------------|-----|-----|
| type     | 如DatePicker组件的子类型：month,week,date,range；                                      | `string`                                                 |     |     |
| onSearch | 搜索函数                                                                          | `(params: any) => Promise<any>`                          |     |     |
| search   | select组件搜索配置，when值input代表输入的时候搜索，when值为open代表下拉框打开时搜索，label与value配置其使用的接口返回字段 | `{ when: 'open'｜'input'; label: string; value: string }` |     |     |



```
import SchemaFilterForm from '@schema-forms/filter-form';
const Index = () => {
    const formRef = useRef<{ form: WrappedFormUtils }>();   // antd3 form ref

    // Form layout props
    const formLayoutProps = {
      colon: false,
      layout: 'inline' as 'horizontal' | 'vertical' | 'inline',
      labelAlign: 'left' as 'left' | 'right',
    };
    // form schema
    const schemas = [
      {
         title: '合同名称',
         dataIndex: 'name',
      },
      {
         title: '合同编号',
         dataIndex: 'code',
      },
      {
         title: '外用标识',
         dataIndex: 'flagOfAplusContract',
         formItemProps: {
            initialValue:
               getQueryString(location.href, 'flagOfAplusContract') ||
               undefined,
         },
      },
      {
         title: '签约主体',
         dataIndex: 'mainBodyName',
      },
      {
         title: '合同类型',
         dataIndex: 'protocolTypes',
         valueType: 'select',
         formItemProps: {
            style: { gridColumn: '1/3' },
         },
         fieldProps: {
            mode: 'multiple',
            search: {
               when: 'open',
               key: 'SEARCH_CONTRACT_TYPE',
            },
         },
      },
      {
         title: '合同环节',
         dataIndex: 'flowDefinitionIdWithTaskStepFlag',
         valueType: 'select',
         formItemProps: {
            style: { gridColumn: '3/5' },
         },
         fieldProps: {
            mode: 'multiple',
            search: {
               when: 'open',
               key: 'SEARCH_CONTRACT_STEP',
            },
         },
      },
      {
         title: '创建时间',
         dataIndex: 'timeRange',
         valueType: 'datepicker',
         formItemProps: {
            style: { gridColumn: '1/3' },
         },
         fieldProps: {
            type: 'range',
            format: 'YYYY-MM-DD',
            style: { width: '100%' },
         },
      },
    ];
    
    /**
     * 根据key获取请求方法
     * @param str
     */
    const getFuncByStr = (str: string): ((...args: any) => any) => {
       const funcMap: { [key: string]: any } = {
          SEARCH_CONTRACT_TYPE: getProtocolTypesResp,
          SEARCH_CONTRACT_STEP: getProcessDefsDataResp,
          SEARCH_OPS_USER_BY_ID_OR_NAME: (value: string | number) =>
             getOpsUserResp({ opsIdOrName: value }).then((res: any[]) =>
                res.map((r) => ({
                   label: `${r.realName} (${r.dingtalkId})`,
                   value: r.id,
                }))
             ),
       };
       return funcMap[str];
    };
    
    /**
     * 根据配置key转换返回带有最终请求方法的配置
     * @param schemas
     */
    const convertSearch = (schemas: any[]): any[] => {
       return schemas.map((s) => {
          if (s?.fieldProps?.search) {
             s.fieldProps.onSearch = getFuncByStr(s.fieldProps.search.key);
             return s;
          }
          return s;
       });
    };

    
    const convertSearch = (schemas) => {
        // 此方法用来将fieldProps.search.key的字符串值转换为对应的请求方法，因为http请求不能返回函数类型，所以建议用此方法代替
    }
    
    // 当返回类型是Promise时，loading状态可以由本组件内部维护，不是Promise则必须由父组件提供，否则没有loading状态
    const getContractList: (...args) => Promise<any> | any;
    
    return (
        <SchemaFilterForm
          wrappedComponentRef={formRef}
          formProps={formLayoutProps}
          schema={convertSearch(schemas)}
          submitter={{
             loading: tableLoading,
             submit: (values: any) => getContractList(values, 1),
          }}
        />
    );
};
```
## 使用注意事项
默认使用css grid布局，且为四列，如需调整可参考css的grid布局，通过`formProps.style`属性调整布局样式；字段label的宽度默认为5em，如需调整Form.Item各种样式可通过`formItemProps.style`属性
