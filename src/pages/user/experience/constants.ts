export const PAGE_SIZE_OPTIONS = [5, 10, 20, 0];
export const DEFAULT_PAGE_SIZE = 5;

/**
 * Trang cố định cao = 100dvh - chiều cao header của layout (80px).
 * Bảng cuộn bên trong khung, thanh phân trang luôn nằm đáy màn hình
 * và giao diện không đổi khi đổi số dòng mỗi trang.
 * Nếu header layout của bạn cao khác 80px thì sửa số này.
 */
export const PAGE_HEIGHT = "lg:h-[calc(100dvh-80px)]";

export const fieldClass =
  "h-9 rounded-lg border border-white/10 bg-[#090A0D] px-3 text-sm text-gray-200 outline-none transition focus:border-[#8B9FF8]";
