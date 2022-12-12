import React, { useRef } from "react";
import styles from "../styles/FileUpload.module.sass";
interface FileUploadProps {
  setFile: Function;
  accept: string;
  children: React.ReactNode;
}
const FileUpload: React.FC<FileUploadProps> = ({
  setFile,
  accept,
  children,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };
  return (
    <div onClick={() => ref.current?.click()}>
      <input
        className={styles.defaultUpload}
        accept={accept}
        type="file"
        ref={ref}
        onChange={onChange}
      />
      {children}
    </div>
  );
};

export default FileUpload;
