import { createFileRoute } from '@tanstack/react-router'
// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState} from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";


export const Route = createFileRoute('/admin/atlas/atlas')({
  component: RouteComponent,
})

function RouteComponent() {
  return <App />;
}


const App: React.FC = () => {
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);
  const [selectMode, setSelectMode] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [viewMode, setViewMode] = useState("grid");
  const [filterTag, setFilterTag] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewPhoto, setPreviewPhoto] = useState<Photo | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  // 模拟图集信息
  const albumInfo = {
    id: 1,
    name: "西藏之旅",
    description:
      "2024年3月西藏旅行拍摄的照片，包含布达拉宫、纳木错、羊卓雍错等景点",
    coverImage:
      "https://public.readdy.ai/ai/img_res/8bdf4bca631a342ddc6ea05e92488fa5.jpg",
    createdDate: "2025-03-15",
    updatedDate: "2025-04-01",
    photoCount: 127,
    tags: ["旅行", "风景", "西藏", "雪山", "湖泊", "寺庙"],
  };

  // 模拟照片数据
  const photos: Photo[] = [
    {
      id: 1,
      name: "布达拉宫日落.jpg",
      description: "布达拉宫在日落时分的壮丽景色",
      url: "https://public.readdy.ai/ai/img_res/9c5b3d6e8f2a1c7b4d0e9f2a1c3b5d7e.jpg",
      thumbnailUrl:
        "https://public.readdy.ai/ai/img_res/9c5b3d6e8f2a1c7b4d0e9f2a1c3b5d7e.jpg",
      size: "5.2 MB",
      dimensions: "5184 × 3456",
      takenDate: "2025-03-16",
      uploadDate: "2025-03-20",
      camera: "Canon EOS R5",
      lens: "RF 24-70mm f/2.8L IS USM",
      iso: "100",
      aperture: "f/8",
      shutterSpeed: "1/125s",
      focalLength: "35mm",
      tags: ["布达拉宫", "日落", "建筑", "西藏", "拉萨"],
    },
    {
      id: 2,
      name: "纳木错湖景.jpg",
      description: "纳木错湖泊壮丽的自然风光",
      url: "https://public.readdy.ai/ai/img_res/7a1b3c5d9e8f2a4c6b0d2e4f6a8c0b2d.jpg",
      thumbnailUrl:
        "https://public.readdy.ai/ai/img_res/7a1b3c5d9e8f2a4c6b0d2e4f6a8c0b2d.jpg",
      size: "6.8 MB",
      dimensions: "5472 × 3648",
      takenDate: "2025-03-17",
      uploadDate: "2025-03-20",
      camera: "Canon EOS R5",
      lens: "RF 16-35mm f/2.8L IS USM",
      iso: "100",
      aperture: "f/11",
      shutterSpeed: "1/250s",
      focalLength: "16mm",
      tags: ["纳木错", "湖泊", "雪山", "自然", "西藏"],
    },
    {
      id: 3,
      name: "羊卓雍错全景.jpg",
      description: "羊卓雍错湖泊的壮丽全景",
      url: "https://public.readdy.ai/ai/img_res/3e5d7a9c1b4f2e6d8a0c2b4f6e8a0c2d.jpg",
      thumbnailUrl:
        "https://public.readdy.ai/ai/img_res/3e5d7a9c1b4f2e6d8a0c2b4f6e8a0c2d.jpg",
      size: "8.4 MB",
      dimensions: "7680 × 3840",
      takenDate: "2025-03-18",
      uploadDate: "2025-03-21",
      camera: "Canon EOS R5",
      lens: "RF 16-35mm f/2.8L IS USM",
      iso: "100",
      aperture: "f/11",
      shutterSpeed: "1/320s",
      focalLength: "16mm",
      tags: ["羊卓雍错", "湖泊", "全景", "自然", "西藏"],
    },
    {
      id: 4,
      name: "扎什伦布寺.jpg",
      description: "扎什伦布寺的宏伟建筑和金顶",
      url: "https://public.readdy.ai/ai/img_res/1a3c5e7b9d2f4a6c8e0b2d4f6a8c0e2d.jpg",
      thumbnailUrl:
        "https://public.readdy.ai/ai/img_res/1a3c5e7b9d2f4a6c8e0b2d4f6a8c0e2d.jpg",
      size: "5.7 MB",
      dimensions: "5184 × 3456",
      takenDate: "2025-03-19",
      uploadDate: "2025-03-21",
      camera: "Canon EOS R5",
      lens: "RF 24-70mm f/2.8L IS USM",
      iso: "200",
      aperture: "f/8",
      shutterSpeed: "1/200s",
      focalLength: "50mm",
      tags: ["扎什伦布寺", "寺庙", "建筑", "宗教", "西藏", "日喀则"],
    },
    {
      id: 5,
      name: "珠峰营地日出.jpg",
      description: "珠穆朗玛峰营地的壮丽日出",
      url: "https://public.readdy.ai/ai/img_res/5b7d9f1a3c5e7b9d1f3a5c7e9b1d3f5a.jpg",
      thumbnailUrl:
        "https://public.readdy.ai/ai/img_res/5b7d9f1a3c5e7b9d1f3a5c7e9b1d3f5a.jpg",
      size: "7.2 MB",
      dimensions: "5472 × 3648",
      takenDate: "2025-03-20",
      uploadDate: "2025-03-22",
      camera: "Canon EOS R5",
      lens: "RF 70-200mm f/2.8L IS USM",
      iso: "100",
      aperture: "f/11",
      shutterSpeed: "1/125s",
      focalLength: "70mm",
      tags: ["珠穆朗玛峰", "日出", "雪山", "营地", "西藏"],
    },
    {
      id: 6,
      name: "藏族村落.jpg",
      description: "传统藏族村落与雪山背景",
      url: "https://public.readdy.ai/ai/img_res/9c1e3a5b7d9f1e3a5c7b9d1f3e5a7c9b.jpg",
      thumbnailUrl:
        "https://public.readdy.ai/ai/img_res/9c1e3a5b7d9f1e3a5c7b9d1f3e5a7c9b.jpg",
      size: "5.9 MB",
      dimensions: "5184 × 3456",
      takenDate: "2025-03-21",
      uploadDate: "2025-03-22",
      camera: "Canon EOS R5",
      lens: "RF 24-70mm f/2.8L IS USM",
      iso: "200",
      aperture: "f/8",
      shutterSpeed: "1/250s",
      focalLength: "35mm",
      tags: ["藏族", "村落", "民居", "文化", "西藏"],
    },
    {
      id: 7,
      name: "念青唐古拉山脉.jpg",
      description: "壮丽的念青唐古拉山脉全景",
      url: "https://public.readdy.ai/ai/img_res/3a5c7e9b1d3f5a7c9e1b3d5f7a9c1e3b.jpg",
      thumbnailUrl:
        "https://public.readdy.ai/ai/img_res/3a5c7e9b1d3f5a7c9e1b3d5f7a9c1e3b.jpg",
      size: "7.8 MB",
      dimensions: "7680 × 3840",
      takenDate: "2025-03-22",
      uploadDate: "2025-03-23",
      camera: "Canon EOS R5",
      lens: "RF 16-35mm f/2.8L IS USM",
      iso: "100",
      aperture: "f/11",
      shutterSpeed: "1/320s",
      focalLength: "16mm",
      tags: ["念青唐古拉", "山脉", "雪山", "全景", "西藏"],
    },
    {
      id: 8,
      name: "藏族传统服饰.jpg",
      description: "身着传统服饰的藏族妇女",
      url: "https://public.readdy.ai/ai/img_res/7c9e1b3d5f7a9c1e3b5d7f9a1c3e5b7d.jpg",
      thumbnailUrl:
        "https://public.readdy.ai/ai/img_res/7c9e1b3d5f7a9c1e3b5d7f9a1c3e5b7d.jpg",
      size: "4.8 MB",
      dimensions: "4256 × 2832",
      takenDate: "2025-03-23",
      uploadDate: "2025-03-24",
      camera: "Canon EOS R5",
      lens: "RF 85mm f/1.2L USM",
      iso: "200",
      aperture: "f/2.8",
      shutterSpeed: "1/200s",
      focalLength: "85mm",
      tags: ["藏族", "服饰", "人像", "文化", "西藏"],
    },
    {
      id: 9,
      name: "拉萨街景.jpg",
      description: "拉萨市中心八廓街的繁忙景象",
      url: "https://public.readdy.ai/ai/img_res/1e3b5d7f9a1c3e5b7d9f1a3c5e7b9d1f.jpg",
      thumbnailUrl:
        "https://public.readdy.ai/ai/img_res/1e3b5d7f9a1c3e5b7d9f1a3c5e7b9d1f.jpg",
      size: "5.4 MB",
      dimensions: "5184 × 3456",
      takenDate: "2025-03-24",
      uploadDate: "2025-03-25",
      camera: "Canon EOS R5",
      lens: "RF 35mm f/1.8 IS STM",
      iso: "400",
      aperture: "f/5.6",
      shutterSpeed: "1/320s",
      focalLength: "35mm",
      tags: ["拉萨", "八廓街", "街景", "市场", "西藏"],
    },
    {
      id: 10,
      name: "林芝桃花.jpg",
      description: "林芝地区盛开的桃花与雪山",
      url: "https://public.readdy.ai/ai/img_res/5b7d9f1a3c5e7b9d1f3a5c7e9b1d3f5a.jpg",
      thumbnailUrl:
        "https://public.readdy.ai/ai/img_res/5b7d9f1a3c5e7b9d1f3a5c7e9b1d3f5a.jpg",
      size: "6.2 MB",
      dimensions: "5472 × 3648",
      takenDate: "2025-03-25",
      uploadDate: "2025-03-26",
      camera: "Canon EOS R5",
      lens: "RF 24-70mm f/2.8L IS USM",
      iso: "100",
      aperture: "f/8",
      shutterSpeed: "1/250s",
      focalLength: "50mm",
      tags: ["林芝", "桃花", "春天", "雪山", "西藏"],
    },
    {
      id: 11,
      name: "圣湖玛旁雍错.jpg",
      description: "神圣的玛旁雍错湖泊风光",
      url: "https://public.readdy.ai/ai/img_res/9c1e3a5b7d9f1e3a5c7b9d1f3e5a7c9b.jpg",
      thumbnailUrl:
        "https://public.readdy.ai/ai/img_res/9c1e3a5b7d9f1e3a5c7b9d1f3e5a7c9b.jpg",
      size: "6.5 MB",
      dimensions: "5472 × 3648",
      takenDate: "2025-03-26",
      uploadDate: "2025-03-27",
      camera: "Canon EOS R5",
      lens: "RF 16-35mm f/2.8L IS USM",
      iso: "100",
      aperture: "f/11",
      shutterSpeed: "1/250s",
      focalLength: "24mm",
      tags: ["玛旁雍错", "湖泊", "圣湖", "自然", "西藏"],
    },
    {
      id: 12,
      name: "冈仁波齐峰.jpg",
      description: "神山冈仁波齐的壮丽景色",
      url: "https://public.readdy.ai/ai/img_res/3a5c7e9b1d3f5a7c9e1b3d5f7a9c1e3b.jpg",
      thumbnailUrl:
        "https://public.readdy.ai/ai/img_res/3a5c7e9b1d3f5a7c9e1b3d5f7a9c1e3b.jpg",
      size: "7.1 MB",
      dimensions: "5472 × 3648",
      takenDate: "2025-03-27",
      uploadDate: "2025-03-28",
      camera: "Canon EOS R5",
      lens: "RF 70-200mm f/2.8L IS USM",
      iso: "100",
      aperture: "f/11",
      shutterSpeed: "1/320s",
      focalLength: "120mm",
      tags: ["冈仁波齐", "神山", "雪山", "宗教", "西藏"],
    },
  ];

  // 根据排序方式对照片进行排序
  const sortedPhotos = [...photos].sort((a, b) => {
    if (sortBy === "date") {
      return (
        new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
      );
    }
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "size") {
      return parseFloat(b.size) - parseFloat(a.size);
    }
    return 0;
  });

  // 根据标签和搜索词过滤照片
  const filteredPhotos = sortedPhotos.filter((photo) => {
    const matchesTag = filterTag ? photo.tags.includes(filterTag) : true;
    const matchesSearch = searchQuery
      ? photo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : true;
    return matchesTag && matchesSearch;
  });

  // 处理照片选择
  const togglePhotoSelection = (photoId: number) => {
    if (selectedPhotos.includes(photoId)) {
      setSelectedPhotos(selectedPhotos.filter((id) => id !== photoId));
    } else {
      setSelectedPhotos([...selectedPhotos, photoId]);
    }
  };

  // 全选/取消全选
  const toggleSelectAll = () => {
    if (selectedPhotos.length === filteredPhotos.length) {
      setSelectedPhotos([]);
    } else {
      setSelectedPhotos(filteredPhotos.map((photo) => photo.id));
    }
  };

  // 删除选中的照片
  const deleteSelectedPhotos = () => {
    // 实际应用中这里会调用API删除照片
    alert(`删除 ${selectedPhotos.length} 张照片`);
    setSelectedPhotos([]);
    setSelectMode(false);
  };

  // 处理照片预览
  const handlePhotoPreview = (photo: Photo) => {
    setPreviewPhoto(photo);
  };

  // 关闭照片预览
  const closePhotoPreview = () => {
    setPreviewPhoto(null);
  };

  // 获取所有标签
  const allTags = Array.from(new Set(photos.flatMap((photo) => photo.tags)));

  // 处理选择模式切换
  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
    if (selectMode) {
      setSelectedPhotos([]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <header className="bg-white shadow-sm z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <a
              href="https://readdy.ai/home/cb412d75-e2b9-46f6-ad03-3fcdd9f09acd/8b07401a-eff1-4d3f-8066-782e143c006d"
              data-readdy="true"
              className="text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              返回图集列表
            </a>
            <h1 className="text-xl font-bold">西藏之旅</h1>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="!rounded-button whitespace-nowrap"
              onClick={() => setShowEditDialog(true)}
            >
              <i className="fas fa-edit mr-2"></i>
              编辑图集信息
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="!rounded-button whitespace-nowrap"
            >
              <i className="fas fa-share-alt mr-2"></i>
              分享图集
            </Button>
          </div>
        </div>
      </header>

      {/* 图集信息区 */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-start space-x-6">
            <div className="w-1/4 h-48 rounded-lg overflow-hidden shadow-md">
              <img
                src={albumInfo.coverImage}
                alt={albumInfo.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{albumInfo.name}</h2>
                  <p className="text-gray-600 mt-2">{albumInfo.description}</p>
                </div>
                <div className="flex space-x-2">
                  <Badge variant="secondary" className="px-3 py-1">
                    <i className="fas fa-calendar-alt mr-2"></i>
                    创建于 {albumInfo.createdDate}
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    <i className="fas fa-images mr-2"></i>
                    {albumInfo.photoCount} 张照片
                  </Badge>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {albumInfo.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => setFilterTag(tag === filterTag ? "" : tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-500">拍摄时间范围</div>
                  <div className="font-medium">2025-03-16 至 2025-03-27</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-500">拍摄地点</div>
                  <div className="font-medium">西藏自治区</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-500">存储空间</div>
                  <div className="font-medium">78.5 MB</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-500">最近更新</div>
                  <div className="font-medium">{albumInfo.updatedDate}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 功能操作栏 */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="!rounded-button whitespace-nowrap"
                  >
                    <i className="fas fa-sort mr-2"></i>
                    {sortBy === "date" && "按上传日期排序"}
                    {sortBy === "name" && "按名称排序"}
                    {sortBy === "size" && "按大小排序"}
                    <i className="fas fa-chevron-down ml-2"></i>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortBy("date")}>
                    <i className="fas fa-calendar-alt mr-2"></i>
                    按上传日期排序
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("name")}>
                    <i className="fas fa-font mr-2"></i>
                    按名称排序
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("size")}>
                    <i className="fas fa-weight mr-2"></i>
                    按大小排序
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="!rounded-button"
                >
                  <i className="fas fa-th"></i>
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="!rounded-button"
                >
                  <i className="fas fa-list"></i>
                </Button>
              </div>

              {filterTag && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <span>标签: {filterTag}</span>
                  <button
                    onClick={() => setFilterTag("")}
                    className="ml-1 hover:bg-gray-200 rounded-full h-4 w-4 inline-flex items-center justify-center"
                  >
                    <i className="fas fa-times text-xs"></i>
                  </button>
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <Input
                  placeholder="搜索照片..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 border-none bg-gray-100"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                {searchQuery && (
                  <button
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setSearchQuery("")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="!rounded-button whitespace-nowrap"
                  >
                    <i className="fas fa-filter mr-2"></i>
                    筛选
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <div className="p-2">
                    <div className="font-medium mb-2">按标签筛选</div>
                    <div className="max-h-48 overflow-y-auto">
                      {allTags.map((tag) => (
                        <DropdownMenuItem
                          key={tag}
                          onClick={() =>
                            setFilterTag(tag === filterTag ? "" : tag)
                          }
                        >
                          <div className="flex items-center w-full">
                            <span className="flex-1">{tag}</span>
                            {tag === filterTag && (
                              <i className="fas fa-check text-blue-500"></i>
                            )}
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant={selectMode ? "default" : "outline"}
                className="!rounded-button whitespace-nowrap"
                onClick={toggleSelectMode}
              >
                <i
                  className={`fas ${selectMode ? "fa-times" : "fa-check-square"} mr-2`}
                ></i>
                {selectMode ? "取消选择" : "选择照片"}
              </Button>

              <Button className="!rounded-button whitespace-nowrap">
                <i className="fas fa-plus mr-2"></i>
                添加照片
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 照片展示区 */}
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        <div className="container mx-auto">
          {filteredPhotos.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm">
              <i className="fas fa-search text-4xl text-gray-300 mb-4"></i>
              <p className="text-gray-500">没有找到符合条件的照片</p>
              <Button
                variant="outline"
                className="mt-4 !rounded-button whitespace-nowrap"
                onClick={() => {
                  setSearchQuery("");
                  setFilterTag("");
                }}
              >
                清除筛选条件
              </Button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-4 gap-4">
              {filteredPhotos.map((photo) => (
                <Card
                  key={photo.id}
                  className={`overflow-hidden cursor-pointer transition-all ${
                    selectedPhotos.includes(photo.id)
                      ? "ring-2 ring-blue-500"
                      : "hover:shadow-md"
                  }`}
                  onClick={() =>
                    selectMode
                      ? togglePhotoSelection(photo.id)
                      : handlePhotoPreview(photo)
                  }
                >
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={photo.thumbnailUrl}
                      alt={photo.name}
                      className="w-full h-full object-cover object-top"
                    />
                    {selectMode && (
                      <div className="absolute top-2 left-2">
                        <Checkbox
                          checked={selectedPhotos.includes(photo.id)}
                          onCheckedChange={() => togglePhotoSelection(photo.id)}
                          className="h-5 w-5 border-2 bg-white bg-opacity-80"
                        />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm truncate">
                      {photo.name}
                    </h3>
                    <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                      <span>{photo.size}</span>
                      <span>{photo.uploadDate}</span>
                    </div>
                    <div className="flex mt-2 flex-wrap gap-1">
                      {photo.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {photo.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{photo.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredPhotos.map((photo) => (
                <Card
                  key={photo.id}
                  className={`cursor-pointer transition-all ${
                    selectedPhotos.includes(photo.id)
                      ? "ring-2 ring-blue-500"
                      : "hover:shadow-md"
                  }`}
                  onClick={() =>
                    selectMode
                      ? togglePhotoSelection(photo.id)
                      : handlePhotoPreview(photo)
                  }
                >
                  <div className="flex p-3">
                    <div className="w-20 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0 relative">
                      <img
                        src={photo.thumbnailUrl}
                        alt={photo.name}
                        className="w-full h-full object-cover object-top"
                      />
                      {selectMode && (
                        <div className="absolute top-1 left-1">
                          <Checkbox
                            checked={selectedPhotos.includes(photo.id)}
                            onCheckedChange={() =>
                              togglePhotoSelection(photo.id)
                            }
                            className="h-4 w-4 border-2 bg-white bg-opacity-80"
                          />
                        </div>
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{photo.name}</h3>
                        {!selectMode && (
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="!rounded-button whitespace-nowrap"
                            >
                              <i className="fas fa-download"></i>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="!rounded-button whitespace-nowrap"
                            >
                              <i className="fas fa-share-alt"></i>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 !rounded-button whitespace-nowrap"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between items-center mt-1 text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span>{photo.size}</span>
                          <span>{photo.dimensions}</span>
                          <span>{photo.uploadDate}</span>
                        </div>
                        <div className="flex gap-1">
                          {photo.tags.slice(0, 5).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {photo.tags.length > 5 && (
                            <Badge variant="outline" className="text-xs">
                              +{photo.tags.length - 5}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 批量操作栏 */}
      {selectMode && selectedPhotos.length > 0 && (
        <div className="bg-white shadow-lg border-t fixed bottom-0 left-0 right-0 py-3 px-6 z-20">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Checkbox
                checked={selectedPhotos.length === filteredPhotos.length}
                onCheckedChange={toggleSelectAll}
                id="select-all"
              />
              <label htmlFor="select-all" className="text-sm cursor-pointer">
                全选 ({selectedPhotos.length}/{filteredPhotos.length})
              </label>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="!rounded-button whitespace-nowrap"
              >
                <i className="fas fa-download mr-2"></i>
                下载
              </Button>
              <Button
                variant="outline"
                className="!rounded-button whitespace-nowrap"
              >
                <i className="fas fa-share-alt mr-2"></i>
                分享
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="!rounded-button whitespace-nowrap"
                  >
                    <i className="fas fa-folder-plus mr-2"></i>
                    移动到
                    <i className="fas fa-chevron-down ml-2"></i>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <i className="fas fa-folder mr-2 text-yellow-500"></i>
                    城市建筑
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <i className="fas fa-folder mr-2 text-yellow-500"></i>
                    2024春装新品
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <i className="fas fa-folder-plus mr-2"></i>
                    新建图集...
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="outline"
                className="!rounded-button whitespace-nowrap"
              >
                <i className="fas fa-tag mr-2"></i>
                添加标签
              </Button>
              <Button
                variant="destructive"
                className="!rounded-button whitespace-nowrap"
                onClick={deleteSelectedPhotos}
              >
                <i className="fas fa-trash-alt mr-2"></i>
                删除
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 照片预览对话框 */}
      {previewPhoto && (
        <Dialog open={!!previewPhoto} onOpenChange={closePhotoPreview}>
          <DialogContent className="max-w-6xl p-0 h-[80vh] flex flex-col">
            <DialogHeader className="px-6 py-3 flex flex-row justify-between items-center">
              <DialogTitle>{previewPhoto.name}</DialogTitle>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="!rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-download mr-2"></i>
                  下载
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="!rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-share-alt mr-2"></i>
                  分享
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="!rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-edit mr-2"></i>
                  编辑
                </Button>
              </div>
            </DialogHeader>
            <div className="flex-1 bg-gray-900 relative">
              <Swiper
                initialSlide={photos.findIndex((p) => p.id === previewPhoto.id)}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="h-full"
              >
                {photos.map((photo) => (
                  <SwiperSlide
                    key={photo.id}
                    className="flex items-center justify-center"
                  >
                    <img
                      src={photo.url}
                      alt={photo.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="p-4 bg-white">
              <div className="flex space-x-6">
                <div className="flex-1">
                  <h3 className="font-medium text-lg">
                    {previewPhoto.description}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {previewPhoto.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="w-1/3">
                  <ScrollArea className="h-32">
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                      <div className="text-gray-500">拍摄日期</div>
                      <div>{previewPhoto.takenDate}</div>
                      <div className="text-gray-500">上传日期</div>
                      <div>{previewPhoto.uploadDate}</div>
                      <div className="text-gray-500">文件大小</div>
                      <div>{previewPhoto.size}</div>
                      <div className="text-gray-500">尺寸</div>
                      <div>{previewPhoto.dimensions}</div>
                      <div className="text-gray-500">相机</div>
                      <div>{previewPhoto.camera}</div>
                      <div className="text-gray-500">镜头</div>
                      <div>{previewPhoto.lens}</div>
                      <div className="text-gray-500">光圈</div>
                      <div>{previewPhoto.aperture}</div>
                      <div className="text-gray-500">快门速度</div>
                      <div>{previewPhoto.shutterSpeed}</div>
                      <div className="text-gray-500">ISO</div>
                      <div>{previewPhoto.iso}</div>
                      <div className="text-gray-500">焦距</div>
                      <div>{previewPhoto.focalLength}</div>
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* 编辑图集信息对话框 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>编辑图集信息</DialogTitle>
            <DialogDescription>修改图集的基本信息和封面</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="text-sm font-medium mb-1 block">图集名称</label>
              <Input defaultValue={albumInfo.name} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">图集描述</label>
              <textarea
                className="w-full rounded-md border border-gray-300 p-2 min-h-[100px]"
                defaultValue={albumInfo.description}
              ></textarea>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">图集标签</label>
              <Input defaultValue={albumInfo.tags.join(", ")} />
              <p className="text-xs text-gray-500 mt-1">多个标签用逗号分隔</p>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">图集封面</label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {photos.slice(0, 6).map((photo) => (
                  <div
                    key={photo.id}
                    className={`h-20 rounded overflow-hidden cursor-pointer ${
                      photo.id === 1 ? "ring-2 ring-blue-500" : ""
                    }`}
                  >
                    <img
                      src={photo.thumbnailUrl}
                      alt={photo.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowEditDialog(false)}
              className="!rounded-button whitespace-nowrap"
            >
              取消
            </Button>
            <Button
              onClick={() => setShowEditDialog(false)}
              className="!rounded-button whitespace-nowrap"
            >
              保存修改
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// 照片类型定义
interface Photo {
  id: number;
  name: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  size: string;
  dimensions: string;
  takenDate: string;
  uploadDate: string;
  camera: string;
  lens: string;
  iso: string;
  aperture: string;
  shutterSpeed: string;
  focalLength: string;
  tags: string[];
}
