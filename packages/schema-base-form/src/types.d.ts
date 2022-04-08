import React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Omit } from 'antd/lib/_util/type';
import { ConnectedComponentClass } from 'antd/lib/form/interface';

// Input等输入组件需要的配置
export interface FieldProps {
    placeholder?: string;
    allowClear?: boolean;
    style?: React.CSSProperties;
    rest?: any;
    onSearch?: (params: any) => Promise<any>;
    search?: { when: 'open' | 'input'; label: string; value: string };
    [key: string]: any;
}

export interface FormItemProps {
    key: string | number;
    dataIndex: string | number | (string | number)[];
    title: string | React.ReactNode;
    valueType: string;
    valueEnum: any;
    formItemProps?: any; // Form.Item组件需要的配置
    fieldProps?: FieldProps;
    dependencies?: string | number | (string | number)[];
    tooltip?: string;
    request?: (params: any, props: any) => Promise<{ label: string | number; value: string | number }[]>;
    params?: Record<string, any>;
}

export interface CurFormItemProps extends FormItemProps {}

export interface FormItemOptions {
    style?: React.CSSProperties;
    initialValue?: string | number;
    rules?: any[];
    trigger?: string;
    validateFirst?: boolean;
    validateTrigger?: string | string[];
    valuePropName?: string;
    getValueFromEvent?: (e: any) => void;
    normalize?: (value: any, prevValue: any, allValues: any) => any;
}

/**
 * 转换后Form.Item需要的参数
 */
export interface ConvertedFormItemProps {
    key?: string | number;
    title?: string | React.ReactNode;
    dataIndex: string;
    curFormItemProps?: CurFormItemProps;
    options?: FormItemOptions;
    style?: React.CSSProperties;
}

export interface SubmitterProps {
    noInitialSearch?: boolean;
    searchConfig?: {
        resetText?: string;
        submitText?: string;
    };
    resetButtonProps?: any;
    submitButtonProps?: any;
    render?: (props: any, doms?: any) => React.ReactNode[]; // 由父组件完全自主定义提交按钮以及其事件
    loading?: boolean; // 提供submit提交函数的时候loading状态可以由父组件控制
    submit?: (values: any) => Promise<any> | void; // 查询请求函数
}

export interface SchemaBaseFormProps extends FormComponentProps {
    schema: FormItemProps[];
    submitter: SubmitterProps;
    formProps?: any;
}
