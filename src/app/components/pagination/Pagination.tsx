"use client";

import styles from "./Pagination.module.css";

interface Props {
  totalSize: number;
  pageSize?: number;
  curPage?: number;
  onClickNext: (page: number) => void;
  onClickPrev: (page: number) => void;
}

export default function Pagination({
  totalSize,
  pageSize = 15,
  curPage = 1,
  onClickNext,
  onClickPrev,
}: Props) {
  return (
    <div className={styles.pagination}>
      <span>
        {(curPage - 1) * pageSize + 1} - {curPage * pageSize} of {totalSize}
      </span>
      <button>&lt;</button>
      <button>&gt;</button>
    </div>
  );
}
