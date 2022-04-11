import React, { ForwardedRef, forwardRef } from 'react';
import { DatePicker } from 'antd';
import { datePickerType } from '../constants';

const IDatePicker = forwardRef((props: { type?: string }, ref: ForwardedRef<any>) => {
  const iProps = { ...props };
  const { type } = iProps;
  delete iProps.type;

  switch (type) {
    case datePickerType.date:
      return <DatePicker ref={ref} {...props} />;
    case datePickerType.month:
      return <DatePicker.MonthPicker ref={ref} {...props} />;
    case datePickerType.week:
      return <DatePicker.WeekPicker ref={ref} {...props} />;
    case datePickerType.range:
      return <DatePicker.RangePicker ref={ref} {...props} />;
    default:
      return null;
  }
});

IDatePicker.defaultProps = {
  type: '',
};

export default IDatePicker;
