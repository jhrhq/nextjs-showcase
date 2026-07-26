import { type Control, Controller, type FieldPath, type FieldValues } from "react-hook-form";
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/domains/hotel-booking/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/domains/hotel-booking/components/ui/select";
import { Textarea } from "@/domains/hotel-booking/components/ui/textarea";

interface ControlledFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  description?: string;
  placeholder?: string;
  Icon?: React.ElementType;
}

interface ControlledInputProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>
  extends ControlledFieldProps<TFieldValues, TName> {
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
}

export function ControlledInput<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  control,
  name,
  label,
  description,
  placeholder,
  type = "text",
}: ControlledInputProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
          <Input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            aria-invalid={fieldState.invalid}
            className="bg-background"
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

// ─── ControlledNumberInput ────────────────────────────────────────────────────

interface ControlledNumberInputProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>
  extends ControlledFieldProps<TFieldValues, TName> {
  min?: number;
  step?: number;
}

export function ControlledNumberInput<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  control,
  name,
  label,
  description,
  min = 0,
  step = 1,
}: ControlledNumberInputProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <Input
            {...field}
            id={name}
            type="number"
            min={min}
            step={step}
            aria-invalid={fieldState.invalid}
            onChange={(e) => field.onChange(parseFloat(e.target.value) || min)}
            className="bg-background"
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

// ─── ControlledTextarea ───────────────────────────────────────────────────────

interface ControlledTextareaProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>
  extends ControlledFieldProps<TFieldValues, TName> {
  rows?: number;
}

export function ControlledTextarea<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  control,
  name,
  label,
  description,
  placeholder,
  rows = 4,
}: ControlledTextareaProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="border-b pb-6 border-zinc-200">
          {label && <FieldLabel className="text-xl font-semibold mb-3 text-zinc-800 block">{label}</FieldLabel>}

          <Textarea
            {...field}
            rows={rows}
            id={name}
            placeholder={placeholder}
            aria-invalid={fieldState.invalid}
            className="bg-white resize-none"
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

// ─── ControlledSelect ─────────────────────────────────────────────────────────

interface ControlledSelectProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>
  extends ControlledFieldProps<TFieldValues, TName> {
  options: readonly { value: string; label: string }[];
}

export function ControlledSelect<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  control,
  name,
  label,
  description,
  placeholder,
  options,
  Icon,
}: ControlledSelectProps<TFieldValues, TName>) {
  return (
    <Controller
      key={name}
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-zinc-200">
            {Icon && <Icon className="w-5 h-5 text-primary shrink-0" />}
            <div className="flex-1">
              {label && (
                <FieldLabel htmlFor={name} className="text-xs text-gray-500 block">
                  {label}
                </FieldLabel>
              )}
              <Select name={field.name} value={field.value as string} onValueChange={field.onChange}>
                <SelectTrigger
                  id={name}
                  aria-invalid={fieldState.invalid}
                  className="border-0 p-0 h-auto font-semibold text-zinc-800 focus-visible:ring-0 shadow-none bg-transparent w-full max-w-28"
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

// ─── ControlledSwitch ─────────────────────────────────────────────────────────

interface ControlledSwitchProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>
  extends ControlledFieldProps<TFieldValues, TName> {}

export function ControlledSwitch<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  control,
  name,
  label,
  description,
}: ControlledSwitchProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field
          orientation="horizontal"
          data-invalid={fieldState.invalid}
          className="rounded-lg border border-border/60 bg-background px-4 py-3"
        >
          <FieldContent>
            <FieldLabel htmlFor={name}>{label}</FieldLabel>
            {description && <FieldDescription>{description}</FieldDescription>}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldContent>
          <Switch
            id={name}
            name={field.name}
            checked={field.value as boolean}
            onCheckedChange={field.onChange}
            aria-invalid={fieldState.invalid}
          />
        </Field>
      )}
    />
  );
}
