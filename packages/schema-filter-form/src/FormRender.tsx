import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Radio } from 'antd';
import { ISelect, IDatePicker } from './components';
import { convertItemSchemaToV3 } from './utils';
import { compType } from './constants';
import { FormRenderProps } from './types';

const FormRender: React.FC<FormRenderProps> = (props) => {
  const { form, schema, submitter, formProps = {} } = props;
  const { getFieldDecorator } = form;

  const [iSchema, setISchema] = useState(schema);
  const [expanded, setExpanded] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (submitter.noInitialSearch) return;
    form.validateFieldsAndScroll(async (errors, values) => {
      if (errors) return;
      try {
        setLoading(true);
        await submitter.submit(values);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.error('初始化搜索出错了：', e);
      }
    });
  }, []);

  /**
   * 配置输入组件
   * @param itemSchema
   */
  const configComponent = (itemSchema) => {
    const { title, valueEnum, fieldProps } = itemSchema;
    const { allowClear = true } = fieldProps || {};
    const placeholder = `请输入${title || ''}`;

    switch (itemSchema.valueType) {
      case compType.input:
        return <Input placeholder={placeholder} allowClear={allowClear} {...fieldProps} />;
      case compType.select:
        return <ISelect placeholder={placeholder} allowClear={allowClear} valueEnum={valueEnum} {...fieldProps} />;
      case compType.radio:
        return <Radio.Group allowClear={allowClear} {...fieldProps} />;
      case compType.checkbox:
        return <Checkbox.Group allowClear={allowClear} {...fieldProps} />;
      case compType.datepicker:
        return <IDatePicker allowClear={allowClear} {...fieldProps} />;
      default:
        return <Input placeholder={placeholder} allowClear={allowClear} {...fieldProps} />;
    }
  };

  /**
   * 配置form item
   * @param itemSchema
   */
  const configFormItem = (itemSchema) => {
    const { key, title, dataIndex, curFormItemProps, options, style } = convertItemSchemaToV3(itemSchema);

    return (
      <Form.Item
        key={key}
        label={title}
        style={{ display: 'inline-grid', gridTemplateColumns: '0 5em auto 0', ...style }}
        {...curFormItemProps}
      >
        {getFieldDecorator(dataIndex, options)(configComponent(itemSchema))}
      </Form.Item>
    );
  };

  const setItemsExpanded = (schemas, display) => {
    return iSchema.map((sch, index) => {
      if (index <= 2) return sch;
      if (!sch.formItemProps) {
        sch.formItemProps = { style: { display } };
      } else if (!sch.formItemProps.style) {
        sch.formItemProps.style = { display };
      } else {
        sch.formItemProps.style.display = display;
      }
      return sch;
    });
  };

  const toggleFields = (expand: boolean) => {
    setExpanded(!expand);
    if (expand) {
      setISchema(setItemsExpanded(iSchema, 'none'));
    } else {
      setISchema(setItemsExpanded(iSchema, 'inline-grid'));
    }
  };

  return (
    <Form {...formProps} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 25%)', ...formProps.style }}>
      {iSchema.map((s) => configFormItem(s))}
      <section className={expanded ? 'one-line-btn' : 'inline-btn'}>
        {submitter?.render ? (
          submitter.render({ form })
        ) : (
          <>
            <Button
              key="submit"
              type="primary"
              style={{ justifySelf: 'start', marginRight: '10px' }}
              onClick={() => {
                form.validateFieldsAndScroll(async (errors, values) => {
                  if (errors) return;
                  try {
                    setLoading(true);
                    await submitter.submit(values);
                    setLoading(false);
                  } catch (e) {
                    setLoading(false);
                  }
                });
              }}
              loading={loading}
            >
              查询
            </Button>
            <Button
              key="reset"
              style={{ justifySelf: 'start' }}
              disabled={loading}
              onClick={() => {
                form.resetFields();
                setTimeout(() => {
                  form.validateFieldsAndScroll(async (errors, values) => {
                    if (errors) return;
                    try {
                      setLoading(true);
                      await submitter.submit(values).then((res) => console.log('dasdas', res));
                      setLoading(false);
                    } catch (e) {
                      setLoading(false);
                    }
                  });
                }, 0);
              }}
            >
              重置
            </Button>
          </>
        )}
        <Button type="link" icon={expanded ? 'up' : 'down'} onClick={() => toggleFields(expanded)}>
          {expanded ? '收起' : '展开'}
        </Button>
      </section>
    </Form>
  );
};

export default FormRender;
