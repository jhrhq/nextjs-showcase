export type ActionState<T> =
  | {
      success: true;
      data?: T;
      message?: string;
    }
  | {
      success: false;
      formErrors?: string[] | string;
      fieldErrors?: Record<string, string[] | undefined>;
      message?: string;
    };
