import React from 'react';
import { FormComponentProps } from 'antd/lib/form';

// Input等输入组件需要的配置
export interface FieldProps {
  placeholder?: string;
  allowClear?: boolean;
  style?: CSSStyleDeclaration;
  rest: any;
  [key: string]: any;
}

export interface FormItemProps {
  key: string | number;
  dataIndex: string | number | (string | number)[];
  title: string;
  valueType: string;
  valueEnum: any;
  formItemProps?: any; // Form.Item组件需要的配置
  fieldProps?: FieldProps;
  dependencies?: string | number | (string | number)[];
  // width: 'm',
  tooltip?: string;
  request?: (params: any, props: any) => Promise<{ label: string | number; value: string | number }[]>;
  params?: Record<string, any>;
}

export interface SubmitterProps {
  searchConfig?: {
    resetText?: string;
    submitText?: string;
  };
  resetButtonProps?: any;
  submitButtonProps?: any;
  render: (props: any, doms: any) => React.ReactNode[];
}

export interface FormRenderProps extends FormComponentProps {
  schema: FormItemProps[];
  submitter: SubmitterProps;
  formProps?: any;
}
