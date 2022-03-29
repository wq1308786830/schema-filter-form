import React, { forwardRef, useImperativeHandle } from 'react';
import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import FormRender from './FormRender';
import { FormRenderProps } from './types';

import './global.scss';

const Index = forwardRef<FormComponentProps, FormRenderProps>((props, ref) => {
  useImperativeHandle(ref, () => ({
    form: props.form,
  }));

  return <FormRender {...props} />;
});

export default Form.create<FormRenderProps>()(Index);
