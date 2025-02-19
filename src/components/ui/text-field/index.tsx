import {
  TextField as MuiTextField,
  FormControl,
  OutlinedTextFieldProps,
} from "@mui/material";
import { Control, FieldValues, Path } from "react-hook-form";
import { ControllerReactHookForm } from "../controller-react-hook-form";
import LabelField from "../label-field";
import React, { ChangeEvent } from "react";
import { formatCurrency, unformatCurrency } from "@/utils/currency.utils";

export interface TextFieldProps<FormData extends FieldValues>
  extends Omit<OutlinedTextFieldProps, "variant"> {
  label?: string;
  required?: boolean;
  prefix?: string;
  regex?: RegExp;
  currencySeparator?: string;
  name: Path<FormData>;
  control?: Control<FormData>;
  isGhostVariant?: boolean;
}

export const TextField = <T extends FieldValues>({
  name,
  label,
  control,
  required,
  prefix,
  regex,
  currencySeparator,
  isGhostVariant,
  sx,
  ...props
}: TextFieldProps<T>) => (
  <ControllerReactHookForm
    name={name}
    control={control}
    render={({ onChange, ...fieldProps }, { fieldState }) => (
      <FormControl fullWidth error={!!fieldState?.error}>
        {label && (
          <LabelField label={label} htmlFor={name} required={required} />
        )}
        <MuiTextField
          variant="outlined"
          id={name}
          error={!!fieldState?.error}
          helperText={fieldState?.error?.message || props.helperText}
          onChange={(
            e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            let newValue = e.target.value;

            // handle regex
            if (regex) {
              newValue =
                prefix && newValue.startsWith(prefix)
                  ? newValue.slice(prefix.length).replace(regex, "")
                  : newValue.replace(regex, "");
            }

            // handle prefix
            if (prefix) {
              newValue =
                prefix && !newValue.startsWith(prefix)
                  ? prefix + newValue
                  : newValue;
            }

            // handle currency separator
            if (currencySeparator) {
              if (currencySeparator) {
                newValue = unformatCurrency(newValue, currencySeparator); // Remove the separator
                newValue = formatCurrency(newValue, currencySeparator); // Add the separator back
              }
            }

            onChange(newValue);
          }}
          sx={{
            // style for the ghost variant
            ...(isGhostVariant && {
              "& .MuiInputBase-root": {
                borderRadius: "0.625rem",
                backgroundColor: "background.paper",
                backgroundImage: "var(--mui-overlays-4)",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }),

            // style the adornedStart for the outlined
            ...(!isGhostVariant && {
              "& .MuiOutlinedInput-input": {
                px: "1.25rem",
              },
              "& .MuiInputBase-adornedStart": {
                "&.MuiInputBase-root": {
                  alignItems: "stretch",
                  paddingLeft: 0,
                },
                "& .MuiInputAdornment-root": {
                  maxHeight: "stretch",
                  backgroundColor: "var(--mui-palette-divider)",
                  padding: "0 1.5rem",
                  margin: 0,
                },
              },
            }),

            // get placeholder for select
            ...(props.select &&
              props.placeholder && {
                "& .MuiSelect-select span::before": {
                  content: `"${props.placeholder}"`,
                  color: "grey.400",
                },
              }),

            ...sx,
          }}
          {...fieldProps}
          {...props}
        />
      </FormControl>
    )}
  />
);
