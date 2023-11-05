import { useState } from "react";

interface UseMutationState {
  loading: boolean;
  data?: object;
  error?: object;
}
type UseMutationResult = [(data: any) => void, UseMutationState];

export default function useMutation(url: string): UseMutationResult {
  //객체로 state 한번에 관리해줌
  const [state, setState] = useState<UseMutationState>({
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
