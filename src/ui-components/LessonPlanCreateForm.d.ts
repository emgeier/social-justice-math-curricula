/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type LessonPlanCreateFormInputValues = {
    title?: string;
    description?: string;
    mathTopic?: string;
    socialJusticeTopic?: string;
    teacher?: string;
    approved?: boolean;
};
export declare type LessonPlanCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    mathTopic?: ValidationFunction<string>;
    socialJusticeTopic?: ValidationFunction<string>;
    teacher?: ValidationFunction<string>;
    approved?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LessonPlanCreateFormOverridesProps = {
    LessonPlanCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    mathTopic?: PrimitiveOverrideProps<TextFieldProps>;
    socialJusticeTopic?: PrimitiveOverrideProps<TextFieldProps>;
    teacher?: PrimitiveOverrideProps<TextFieldProps>;
    approved?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type LessonPlanCreateFormProps = React.PropsWithChildren<{
    overrides?: LessonPlanCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LessonPlanCreateFormInputValues) => LessonPlanCreateFormInputValues;
    onSuccess?: (fields: LessonPlanCreateFormInputValues) => void;
    onError?: (fields: LessonPlanCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LessonPlanCreateFormInputValues) => LessonPlanCreateFormInputValues;
    onValidate?: LessonPlanCreateFormValidationValues;
} & React.CSSProperties>;
export default function LessonPlanCreateForm(props: LessonPlanCreateFormProps): React.ReactElement;
