import * as React from "react";

export function useImagePreview() {
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);

  const onChange = React.useCallback((next: File | null) => {
    setFile(next);

    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return next ? URL.createObjectURL(next) : null;
    });
  }, []);

  const reset = React.useCallback(() => onChange(null), [onChange]);

  React.useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview);
    },
    [preview],
  );

  return { file, preview, onChange, reset };
}
