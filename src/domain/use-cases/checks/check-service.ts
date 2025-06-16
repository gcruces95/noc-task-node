interface CheckServiceUseCase {
  excute(url: string): Promise<boolean>
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;


export class CheckService implements CheckServiceUseCase {

  constructor(
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) { }

  async excute(url: string): Promise<boolean> {

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error checking ${url}`);
      }
      this.successCallback?.();
      return true;
    } catch (error) {
      this.errorCallback?.(error as string);
      return false;
    }
  }
}