import { useState } from "react";

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}
type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

export default function useMutation<T = any>(
  url: string,
): UseMutationResult<T> {
  //객체로 state 한번에 관리해줌
  const [state, setState] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  const handleSetState = (key: "loading" | "data" | "error", value: any) => {
    setState((prev) => {
      return { ...prev, [key]: value };
    });
  };

  function mutation(data?: any) {
    handleSetState("loading", true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {})) //json에러 걍 무시
      .then((data) => handleSetState("data", data))
      .catch((error) => handleSetState("error", error))
      .finally(() => handleSetState("loading", false));
  }
  return [mutation, { ...state }];
}
