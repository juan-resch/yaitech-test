export class Result {
  public static withError(error: string) {
    return {
      success: false,
      data: null,
      error,
    }
  }

  public static ok<T>(data: T) {
    return {
      success: true,
      data,
      error: null,
    }
  }
}
