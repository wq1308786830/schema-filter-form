/**
 * antd3 Default value of getValueFromEvent
 * @param e
 */
export function defaultGetValueFromEvent(e) {
  if (!e || !e.target) {
    return e;
  }
  const { target } = e;
  return target.type === 'checkbox' ? target.checked : target.value;
}

/**
 * 遵循pro-components的schema-form的数据定义规范，如果以后迁移可以变得方便，
 * 此处将数据转换为antd3支持的数据结构
 * https://procomponents.ant.design/components/schema-form
 * @param itemSchema
 */
export function convertItemSchemaToV3(itemSchema) {
  const { key, dataIndex, title, formItemProps } = itemSchema;
  const curFormItemProps = { ...formItemProps };
  const {
    style,
    initialValue,
    rules,
    trigger = 'onChange',
    validateFirst = false,
    validateTrigger = 'onChange',
    valuePropName = 'value',
    getValueFromEvent = defaultGetValueFromEvent,
    normalize,
  } = curFormItemProps || {};
  const options = {
    style,
    initialValue,
    rules,
    trigger,
    validateFirst,
    validateTrigger,
    valuePropName,
    getValueFromEvent,
    normalize,
  };
  delete curFormItemProps?.initialValue;
  delete curFormItemProps?.rules;
  delete curFormItemProps?.trigger;
  delete curFormItemProps?.validateFirst;
  delete curFormItemProps?.validateTrigger;
  delete curFormItemProps?.valuePropName;
  delete curFormItemProps?.getValueFromEvent;
  delete curFormItemProps?.normalize;
  delete curFormItemProps?.style;

  return { key, title, dataIndex, curFormItemProps, options, style };
}
