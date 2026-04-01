export class APIResponse extends Response {
  constructor(body: any, init?: ResponseInit) {
    super(
      body instanceof Blob
        ? body
        : JSON.stringify({
            success: true,
            error: null,
            data: body,
          }),
      {
        status: 200,
        ...init,
        headers: {
          "Content-Type": "application/json",
          ...init?.headers,
        },
      },
    );
  }
}

export class APIError extends Response {
  constructor(body: any, init?: ResponseInit) {
    super(
      JSON.stringify({
        success: false,
        error: body,
        data: null,
      }),
      {
        status: 404,
        ...init,
        headers: {
          "Content-Type": "application/json",
          ...init?.headers,
        },
      },
    );
  }
}
