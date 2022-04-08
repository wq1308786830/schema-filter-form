import React, { forwardRef, useImperativeHandle } from 'react';
import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import SchemaBaseForm from './SchemaBaseForm';
import { SchemaBaseFormProps } from './types.d';

import './global.scss';

const Index = forwardRef<FormComponentProps, SchemaBaseFormProps>((props, ref) => {
  useImperativeHandle(ref, () => ({
    form: props.form,
  }));

  return <SchemaBaseForm {...props} />;
});

export default Form.create<SchemaBaseFormProps>()(Index);
