import React from "react";
import { FormControl } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Control, FieldValues, Path } from "react-hook-form";
import LabelField from "../label-field";
import dayjs, { Dayjs } from "dayjs";
import { ControllerReactHookForm } from "../controller-react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface DateFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  required?: boolean;
  format?: string;
  helperText?: string;
}

export const DateField = <T extends FieldValues>({
  name,
  label,
  control,
  required,
  format = "DD/MM/YYYY",
  helperText,
}: DateFieldProps<T>) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <ControllerReactHookForm
      name={name}
      control={control}
      render={({ onChange, value, ...fieldProps }, { fieldState }) => (
        <FormControl fullWidth error={!!fieldState?.error}>
          {label && (
            <LabelField label={label} htmlFor={name} required={required} />
          )}
          <DatePicker
            value={value ? dayjs(value, format) : null}
            onChange={(date: Dayjs | null) => onChange(date?.format(format))}
            slotProps={{
              textField: {
                variant: "outlined",
                error: !!fieldState?.error,
                helperText: fieldState?.error?.message || helperText,
                fullWidth: true,
                ...fieldProps,
              },
            }}
            format={format}
          />
        </FormControl>
      )}
    />
  </LocalizationProvider>
);
