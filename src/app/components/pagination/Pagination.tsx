"use client";

import styles from "./Pagination.module.css";

interface Props {
  totalSize: number;
  pageSize?: number;
  curPage?: number;
  onClickNext: () => void;
  onClickPrev: () => void;
}

export default function Pagination({
  totalSize,
  pageSize = 15,
  curPage = 1,
  onClickNext,
  onClickPrev,
}: Props) {
  const handleClickPrev = () => {
    onClickPrev();
  };

  const handleClickNext = () => {
    onClickNext();
  };

  return (
    <div className={styles.pagination}>
      <span>
        {(curPage - 1) * pageSize + 1} -{" "}
        {Math.min(curPage * pageSize, totalSize)} of {totalSize}
      </span>
      <button type="button" disabled={curPage < 2} onClick={handleClickPrev}>
        &lt;
      </button>
      <button
        type="button"
        disabled={curPage >= Math.ceil(totalSize / pageSize)}
        onClick={handleClickNext}
      >
        &gt;
      </button>
    </div>
  );
}
