import type { WorkStyleProps } from "../../../../services/work-style/WorkStyleTypes";

/** Dữ liệu người dùng nhập trong form cập nhật. */
export interface WorkStyleFormValues {
  title: string;
  description: string;
  displayOrder: number;
}

/** Các hành động có thể thực hiện trên một dòng. */
export interface RowActionHandlers {
  onView: (item: WorkStyleProps) => void;
  onEdit: (item: WorkStyleProps) => void;
  onDelete: (item: WorkStyleProps) => void;
}