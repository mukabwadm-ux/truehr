export interface FormActionState {
  status: "idle" | "error" | "success";
  message: string;
  fieldErrors: Record<string, string>;
}

export const initialFormActionState: FormActionState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};
