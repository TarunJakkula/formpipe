# 🧩 formpipe

A composable, lightweight, middleware-style input validation library for JavaScript/TypeScript.  
Built for React, works anywhere.

---

## ✨ Features

- ✅ Middleware-style API for sequential validation
- ✅ Built-in validators (e.g., `email`, `trimmed_not_empty`, `not_empty`)
- ✅ Supports custom validators with typed error codes
- ✅ Framework-agnostic: works in React, Vue, Svelte, Vanilla JS
- ✅ TypeScript-first with full IntelliSense

---

## 📦 Installation

```bash
npm install formpipe
# or
yarn add formpipe
```

# 🚀 quick start

`formpipe` makes validation composable and developer-friendly using a middleware pipeline.

### 🧱 Setup

```typescript
/* SETUP */
import { createValidationMiddleware, coreValidators } from "formpipe";

const middleware = createValidationMiddleware({
  ...coreValidators,
});
```

### ✅ Use

```typescript
/* USAGE */
const { result, value, error, errorCode } = middleware(
  "trimmed_not_empty",
  "email",
  { value: "  user@example.com  " }
);

if (result === "accepted") {
  console.log(value); // 'user@example.com'
} else {
  console.error(error); // e.g., "Invalid email"
}
```

## 🛠 Extensible - Custom Validators

You can define your own validator logic and plug it into the middleware.

### 🧾 Define

```typescript
/* DEFINE */
const usernameValidator = (value: string) => {
  if (!value) {
    return {
      result: "not_accepted",
      value,
      error: "Username required",
      errorCode: "USERNAME_REQUIRED",
    };
  }
  if (value.length < 3) {
    return {
      result: "not_accepted",
      value,
      error: "Too short",
      errorCode: "USERNAME_TOO_SHORT",
    };
  }
  return { result: "accepted", value, error: undefined, errorCode: "NONE" };
};

const customValidators = {
  username: usernameValidator,
};
```

### 🧱 Setup

```typescript
/* SETUP */
import { createValidationMiddleware, coreValidators } from "formpipe";

const middleware = createValidationMiddleware({
  ...coreValidators,
  ...customValidators,
});
```

### ✅ Use

```typescript
/* USAGE */
const { result, value, error, errorCode } = middleware("username", {
  value: "   user   ",
});

if (result === "accepted") {
  console.log(value); // 'user@example.com'
} else {
  console.error(errorCode); // e.g., "USERNAME_REQUIRED" or "USERNAME_TOO_SHORT"
}
```

# 📚 API Reference

`createValidationMiddleware(validators)`

Creates a validation pipeline from a map of named validators.

```typescript
type Validator = (value: any) => MiddlewareOutput;

type MiddlewareOutput = {
  result: "accepted" | "not_accepted";
  value: any;
  error?: string;
  errorCode: string;
};
```

`middleware(...steps: string[], { value }: { value: any })`

Executes validators sequentially. If any validator fails, it short-circuits and returns an error.

# 📄 License

MIT License © 2025 Tarun Jakkula
