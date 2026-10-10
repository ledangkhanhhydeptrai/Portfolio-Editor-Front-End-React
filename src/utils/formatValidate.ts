const formatValidate = {
  thumbnailFile: {
    required: "Vui lòng chọn ảnh thumbnail",
    validate: {
      fileType: (file: FileList) =>
        file.length === 0 ||
        ["image/jpeg", "image/png", "image/webp"].includes(file[0].type) ||
        "Thumbnail chỉ chấp nhận JPG, PNG hoặc WEBP",
      fileSize: (file: FileList) =>
        file.length === 0 ||
        file[0].size <= 5 * 1024 * 1024 ||
        "Thumbnail không được vượt quá 5MB",
    },
  },
  videoFile: {
    required: "Vui lòng chọn video",
    validate: {
      fileType: (file: FileList) =>
        file.length === 0 ||
        ["video/mp4", "video/webm", "video/quicktime"].includes(file[0].type) ||
        "Video chỉ chấp nhận MP4, WEBM hoặc MOV",
      fileSize: (file: FileList) =>
        file.length === 0 ||
        file[0].size <= 100 * 1024 * 1024 ||
        "Video không được vượt quá 100MB",
    },
  },
};
export default formatValidate;