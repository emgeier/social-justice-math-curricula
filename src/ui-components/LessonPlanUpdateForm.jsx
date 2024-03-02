/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getLessonPlan } from "../graphql/queries";
import { updateLessonPlan } from "../graphql/mutations";
const client = generateClient();
export default function LessonPlanUpdateForm(props) {
  const {
    id: idProp,
    lessonPlan: lessonPlanModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    title: "",
    description: "",
    mathTopic: "",
    socialJusticeTopic: "",
    teacher: "",
    approved: false,
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [mathTopic, setMathTopic] = React.useState(initialValues.mathTopic);
  const [socialJusticeTopic, setSocialJusticeTopic] = React.useState(
    initialValues.socialJusticeTopic
  );
  const [teacher, setTeacher] = React.useState(initialValues.teacher);
  const [approved, setApproved] = React.useState(initialValues.approved);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = lessonPlanRecord
      ? { ...initialValues, ...lessonPlanRecord }
      : initialValues;
    setTitle(cleanValues.title);
    setDescription(cleanValues.description);
    setMathTopic(cleanValues.mathTopic);
    setSocialJusticeTopic(cleanValues.socialJusticeTopic);
    setTeacher(cleanValues.teacher);
    setApproved(cleanValues.approved);
    setErrors({});
  };
  const [lessonPlanRecord, setLessonPlanRecord] =
    React.useState(lessonPlanModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getLessonPlan.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getLessonPlan
        : lessonPlanModelProp;
      setLessonPlanRecord(record);
    };
    queryData();
  }, [idProp, lessonPlanModelProp]);
  React.useEffect(resetStateValues, [lessonPlanRecord]);
  const validations = {
    title: [],
    description: [],
    mathTopic: [],
    socialJusticeTopic: [],
    teacher: [],
    approved: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          title: title ?? null,
          description: description ?? null,
          mathTopic: mathTopic ?? null,
          socialJusticeTopic: socialJusticeTopic ?? null,
          teacher: teacher ?? null,
          approved,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateLessonPlan.replaceAll("__typename", ""),
            variables: {
              input: {
                id: lessonPlanRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "LessonPlanUpdateForm")}
      {...rest}
    >
      <TextField
        label="Title"
        isRequired={false}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title: value,
              description,
              mathTopic,
              socialJusticeTopic,
              teacher,
              approved,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description: value,
              mathTopic,
              socialJusticeTopic,
              teacher,
              approved,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Math topic"
        isRequired={false}
        isReadOnly={false}
        value={mathTopic}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              mathTopic: value,
              socialJusticeTopic,
              teacher,
              approved,
            };
            const result = onChange(modelFields);
            value = result?.mathTopic ?? value;
          }
          if (errors.mathTopic?.hasError) {
            runValidationTasks("mathTopic", value);
          }
          setMathTopic(value);
        }}
        onBlur={() => runValidationTasks("mathTopic", mathTopic)}
        errorMessage={errors.mathTopic?.errorMessage}
        hasError={errors.mathTopic?.hasError}
        {...getOverrideProps(overrides, "mathTopic")}
      ></TextField>
      <TextField
        label="Social justice topic"
        isRequired={false}
        isReadOnly={false}
        value={socialJusticeTopic}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              mathTopic,
              socialJusticeTopic: value,
              teacher,
              approved,
            };
            const result = onChange(modelFields);
            value = result?.socialJusticeTopic ?? value;
          }
          if (errors.socialJusticeTopic?.hasError) {
            runValidationTasks("socialJusticeTopic", value);
          }
          setSocialJusticeTopic(value);
        }}
        onBlur={() =>
          runValidationTasks("socialJusticeTopic", socialJusticeTopic)
        }
        errorMessage={errors.socialJusticeTopic?.errorMessage}
        hasError={errors.socialJusticeTopic?.hasError}
        {...getOverrideProps(overrides, "socialJusticeTopic")}
      ></TextField>
      <TextField
        label="Teacher"
        isRequired={false}
        isReadOnly={false}
        value={teacher}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              mathTopic,
              socialJusticeTopic,
              teacher: value,
              approved,
            };
            const result = onChange(modelFields);
            value = result?.teacher ?? value;
          }
          if (errors.teacher?.hasError) {
            runValidationTasks("teacher", value);
          }
          setTeacher(value);
        }}
        onBlur={() => runValidationTasks("teacher", teacher)}
        errorMessage={errors.teacher?.errorMessage}
        hasError={errors.teacher?.hasError}
        {...getOverrideProps(overrides, "teacher")}
      ></TextField>
      <SwitchField
        label="Approved"
        defaultChecked={false}
        isDisabled={false}
        isChecked={approved}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              title,
              description,
              mathTopic,
              socialJusticeTopic,
              teacher,
              approved: value,
            };
            const result = onChange(modelFields);
            value = result?.approved ?? value;
          }
          if (errors.approved?.hasError) {
            runValidationTasks("approved", value);
          }
          setApproved(value);
        }}
        onBlur={() => runValidationTasks("approved", approved)}
        errorMessage={errors.approved?.errorMessage}
        hasError={errors.approved?.hasError}
        {...getOverrideProps(overrides, "approved")}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || lessonPlanModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || lessonPlanModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
