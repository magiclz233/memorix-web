import { createFileRoute, useNavigate } from '@tanstack/react-router'
// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as echarts from "echarts";


export const Route = createFileRoute('/admin/admin')({
  component: RouteComponent,
})

function RouteComponent() {
  return <App/>
}

const App: React.FC = () => {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [storageSource, setStorageSource] = useState("local");
  const [viewMode, setViewMode] = useState("grid");
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
        // 确保 DOM 元素存在
        const storageChartElement = document.getElementById("storage-chart");
        const visitsChartElement = document.getElementById("visits-chart");
    
        if (!storageChartElement || !visitsChartElement) return;
    // 初始化存储使用统计图表
    const storageChart = echarts.init(document.getElementById("storage-chart"));
    const storageOption = {
      animation: false,
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} GB ({d}%)",
      },
      legend: {
        orient: "vertical",
        right: 10,
        top: "center",
        data: ["图片", "视频", "原始RAW", "其他"],
      },
      series: [
        {
          name: "存储使用",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 320, name: "图片" },
            { value: 240, name: "视频" },
            { value: 180, name: "原始RAW" },
            { value: 60, name: "其他" },
          ],
        },
      ],
    };
    storageChart.setOption(storageOption);
    // 初始化访问统计图表
    const visitsChart = echarts.init(document.getElementById("visits-chart"));
    const visitsOption = {
      animation: false,
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "访问量",
          type: "bar",
          barWidth: "60%",
          data: [120, 200, 150, 80, 70, 110, 130],
        },
      ],
    };
    visitsChart.setOption(visitsOption);
    return () => {
      storageChart.dispose();
      visitsChart.dispose();
    };
  }, [activeNav]);
  // 模拟文件数据
  const files = [
    {
      id: 1,
      name: "西藏风光.jpg",
      size: "5.2 MB",
      date: "2025-04-01",
      source: "local",
      thumbnail:
        "https://public.readdy.ai/ai/img_res/b736bc79562f3b9005db6f76b5cc1dc7.jpg",
      tags: ["风景", "西藏", "雪山"],
    },
    {
      id: 2,
      name: "城市夜景.jpg",
      size: "4.8 MB",
      date: "2025-04-01",
      source: "nas",
      thumbnail:
        "https://public.readdy.ai/ai/img_res/70ae7a91deab05e39edf0b2707a33243.jpg",
      tags: ["城市", "夜景", "建筑"],
    },
    {
      id: 3,
      name: "人像写真.jpg",
      size: "3.7 MB",
      date: "2025-03-30",
      source: "aliyun",
      thumbnail:
        "https://public.readdy.ai/ai/img_res/1e3613450b137e0851f7ef1c96ef8dcf.jpg",
      tags: ["人像", "写真", "女性"],
    },
    {
      id: 4,
      name: "产品展示.jpg",
      size: "2.9 MB",
      date: "2025-03-29",
      source: "qiniu",
      thumbnail:
        "https://public.readdy.ai/ai/img_res/540680f6d8de379aa2d5ff39b1603a97.jpg",
      tags: ["产品", "商业", "科技"],
    },
    {
      id: 5,
      name: "美食摄影.jpg",
      size: "3.2 MB",
      date: "2025-03-28",
      source: "aws",
      thumbnail:
        "https://public.readdy.ai/ai/img_res/f420331533dd60d5dd77be87b1723c88.jpg",
      tags: ["美食", "餐饮", "中式"],
    },
    {
      id: 6,
      name: "旅行视频.mp4",
      size: "125 MB",
      date: "2025-03-27",
      source: "local",
      thumbnail:
        "https://public.readdy.ai/ai/img_res/b73ff47287681d64a3ce2f6d84759b32.jpg",
      tags: ["视频", "旅行", "海滩"],
      duration: "02:35",
    },
  ];
  // 模拟图集数据
  const albums = [
    {
      id: 1,
      name: "西藏之旅",
      count: 127,
      cover:
        "https://public.readdy.ai/ai/img_res/8bdf4bca631a342ddc6ea05e92488fa5.jpg",
      date: "2025-03-15",
    },
    {
      id: 2,
      name: "城市建筑",
      count: 86,
      cover:
        "https://public.readdy.ai/ai/img_res/f99dedbf257a3332bc2b82fed09510ef.jpg",
      date: "2025-02-28",
    },
    {
      id: 3,
      name: "2024春装新品",
      count: 54,
      cover:
        "https://public.readdy.ai/ai/img_res/9bc95d323c3e2b83792644f189eea9d6.jpg",
      date: "2025-01-20",
    },
  ];
  // 模拟社区内容
  const communityPosts = [
    {
      id: 1,
      user: {
        name: "摄影师小王",
        avatar:
          "https://public.readdy.ai/ai/img_res/6cff45973f2a3ef005aa3d0ee80f591d.jpg",
      },
      title: "城市夜景摄影技巧分享",
      image:
        "https://public.readdy.ai/ai/img_res/3b45f8c7fbd04a6e46b6ab0b4ff44f48.jpg",
      likes: 86,
      comments: 24,
    },
    {
      id: 2,
      user: {
        name: "自然摄影师李梅",
        avatar:
          "https://public.readdy.ai/ai/img_res/41b054bf7041d372ae37041e47e82af9.jpg",
      },
      title: "春季花卉微距摄影作品集",
      image:
        "https://public.readdy.ai/ai/img_res/33c129b61d48302a36deefa4e1cb8ce5.jpg",
      likes: 124,
      comments: 36,
    },
  ];
  const navigate = useNavigate();
  return (
    <div className="flex h-screen bg-gray-50">
      {/* 左侧导航栏 */}
      <div className="w-64 bg-white shadow-md z-10">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://public.readdy.ai/ai/img_res/136b971b385e2219250e0445cb7d9352.jpg" />
              <AvatarFallback>摄影师</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">张明摄影</h3>
              <p className="text-xs text-gray-500">专业摄影师</p>
            </div>
          </div>
        </div>
        <nav className="p-2">
          <ul className="space-y-1">
            <li>
              <Button
                variant={activeNav === "dashboard" ? "default" : "ghost"}
                className={`w-full justify-start text-left !rounded-button ${activeNav === "dashboard" ? "" : "text-gray-600"}`}
                onClick={() => setActiveNav("dashboard")}
              >
                <i className="fas fa-tachometer-alt mr-2"></i>
                工作台
              </Button>
            </li>
            <li>
              <Button
                variant={activeNav === "storage" ? "default" : "ghost"}
                className={`w-full justify-start text-left !rounded-button ${activeNav === "storage" ? "" : "text-gray-600"}`}
                onClick={() => setActiveNav("storage")}
              >
                <i className="fas fa-hdd mr-2"></i>
                存储管理
              </Button>
            </li>
            <li>
              <Button
                variant={activeNav === "albums" ? "default" : "ghost"}
                className={`w-full justify-start text-left !rounded-button ${activeNav === "albums" ? "" : "text-gray-600"}`}
                onClick={() => setActiveNav("albums")}
              >
                <i className="fas fa-images mr-2"></i>
                图集管理
              </Button>
            </li>
            <li>
              <Button
                variant={activeNav === "share" ? "default" : "ghost"}
                className={`w-full justify-start text-left !rounded-button ${activeNav === "share" ? "" : "text-gray-600"}`}
                onClick={() => setActiveNav("share")}
              >
                <i className="fas fa-share-alt mr-2"></i>
                分享中心
              </Button>
            </li>
            <li>
              <Button
                variant={activeNav === "community" ? "default" : "ghost"}
                className={`w-full justify-start text-left !rounded-button ${activeNav === "community" ? "" : "text-gray-600"}`}
                onClick={() => setActiveNav("community")}
              >
                <i className="fas fa-users mr-2"></i>
                社区互动
              </Button>
            </li>
            <li>
              <Button
                variant={activeNav === "stats" ? "default" : "ghost"}
                className={`w-full justify-start text-left !rounded-button ${activeNav === "stats" ? "" : "text-gray-600"}`}
                onClick={() => setActiveNav("stats")}
              >
                <i className="fas fa-chart-bar mr-2"></i>
                数据统计
              </Button>
            </li>
          </ul>
          <Separator className="my-4" />
          <ul className="space-y-1">
            <li>
              <a
                href="https://readdy.ai/home/cb412d75-e2b9-46f6-ad03-3fcdd9f09acd/aa0d467c-a4d0-4ca3-9c92-18950bce5897"
                data-readdy="true"
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left text-gray-600 !rounded-button"
                >
                  <i className="fas fa-cog mr-2"></i>
                  系统设置
                </Button>
              </a>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start text-left text-gray-600 !rounded-button"
              >
                <i className="fas fa-question-circle mr-2"></i>
                帮助中心
              </Button>
            </li>
          </ul>
        </nav>
      </div>
      {/* 主内容区 */}
      <div className="flex-1 overflow-auto">
        {/* 工作台 */}
        {activeNav === "dashboard" && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">工作台</h1>
              <div className="flex space-x-2">
                <span className="text-sm text-gray-500">
                  2025-04-02, 星期三
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="!rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-bell mr-2"></i>
                  通知
                </Button>
              </div>
            </div>
            {/* 数据卡片 */}
            <div className="grid grid-cols-4 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    总存储空间
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1.2 TB</div>
                  <p className="text-xs text-gray-500 mt-1">
                    已使用 800 GB (66%)
                  </p>
                  <Progress value={66} className="h-1 mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    图集数量
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42</div>
                  <p className="text-xs text-gray-500 mt-1">本月新增 5 个</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    分享链接
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-gray-500 mt-1">有效链接 15 个</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    作品浏览量
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,568</div>
                  <p className="text-xs text-gray-500 mt-1">
                    较上月 <span className="text-green-500">+12%</span>
                  </p>
                </CardContent>
              </Card>
            </div>
            {/* 快捷入口 */}
            <h2 className="text-lg font-semibold mb-4">快捷入口</h2>
            <div className="grid grid-cols-4 gap-6 mb-6">
              <Button
                className="h-auto py-6 flex flex-col items-center !rounded-button whitespace-nowrap"
                variant="outline"
              >
                <i className="fas fa-cloud-upload-alt text-2xl mb-2 text-blue-500"></i>
                <span>上传文件</span>
              </Button>
              <Button
                className="h-auto py-6 flex flex-col items-center !rounded-button whitespace-nowrap"
                variant="outline"
              >
                <i className="fas fa-folder-plus text-2xl mb-2 text-green-500"></i>
                <span>新建图集</span>
              </Button>
              <Button
                className="h-auto py-6 flex flex-col items-center !rounded-button whitespace-nowrap"
                variant="outline"
              >
                <i className="fas fa-share-square text-2xl mb-2 text-purple-500"></i>
                <span>创建分享</span>
              </Button>
              <Button
                className="h-auto py-6 flex flex-col items-center !rounded-button whitespace-nowrap"
                variant="outline"
              >
                <i className="fas fa-magic text-2xl mb-2 text-amber-500"></i>
                <span>AI 智能整理</span>
              </Button>
            </div>
            {/* 最近活动 */}
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>最近上传</CardTitle>
                  <CardDescription>近期添加的文件</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      {files.slice(0, 4).map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center space-x-3"
                        >
                          <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                            <img
                              src={file.thumbnail}
                              alt={file.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium truncate">
                              {file.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {file.size} • {file.date}
                            </p>
                            <div className="flex mt-1 space-x-1">
                              {file.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="!rounded-button whitespace-nowrap"
                  >
                    查看全部
                    <i className="fas fa-arrow-right ml-2"></i>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>热门图集</CardTitle>
                  <CardDescription>访问量最高的图集</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      {albums.map((album) => (
                        <div
                          key={album.id}
                          className="flex items-center space-x-3"
                        >
                          <div className="w-20 h-16 rounded overflow-hidden flex-shrink-0">
                            <img
                              src={album.cover}
                              alt={album.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium truncate">
                              {album.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {album.count} 张照片 • {album.date}
                            </p>
                            <div className="flex items-center mt-1 text-xs text-gray-500">
                              <i className="fas fa-eye mr-1"></i>
                              <span>
                                {Math.floor(Math.random() * 1000) + 100} 次浏览
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="!rounded-button whitespace-nowrap"
                  >
                    查看全部
                    <i className="fas fa-arrow-right ml-2"></i>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
        {/* 存储管理 */}
        {activeNav === "storage" && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">存储管理</h1>
              <Button className="!rounded-button whitespace-nowrap">
                <i className="fas fa-cloud-upload-alt mr-2"></i>
                上传文件
              </Button>
            </div>
            {/* 存储源选择和操作栏 */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="!rounded-button whitespace-nowrap"
                      >
                        {storageSource === "local" && (
                          <i className="fas fa-laptop mr-2"></i>
                        )}
                        {storageSource === "nas" && (
                          <i className="fas fa-server mr-2"></i>
                        )}
                        {storageSource === "aliyun" && (
                          <i className="fas fa-cloud mr-2"></i>
                        )}
                        {storageSource === "qiniu" && (
                          <i className="fas fa-cloud mr-2"></i>
                        )}
                        {storageSource === "aws" && (
                          <i className="fas fa-cloud mr-2"></i>
                        )}
                        {storageSource === "local" && "本地存储"}
                        {storageSource === "nas" && "NAS 存储"}
                        {storageSource === "aliyun" && "阿里云"}
                        {storageSource === "qiniu" && "七牛云"}
                        {storageSource === "aws" && "AWS S3"}
                        <i className="fas fa-chevron-down ml-2"></i>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => setStorageSource("local")}
                      >
                        <i className="fas fa-laptop mr-2"></i>
                        本地存储
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStorageSource("nas")}>
                        <i className="fas fa-server mr-2"></i>
                        NAS 存储
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setStorageSource("aliyun")}
                      >
                        <i className="fas fa-cloud mr-2"></i>
                        阿里云
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setStorageSource("qiniu")}
                      >
                        <i className="fas fa-cloud mr-2"></i>
                        七牛云
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStorageSource("aws")}>
                        <i className="fas fa-cloud mr-2"></i>
                        AWS S3
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
                </div>
                <div className="relative w-64">
                  <Input
                    placeholder="搜索文件..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-none bg-gray-100"
                  />
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>
            </div>
            {/* 文件展示区 */}
            <div
              className={`grid ${viewMode === "grid" ? "grid-cols-3" : "grid-cols-1"} gap-6`}
            >
              {files
                .filter(
                  (file) =>
                    file.source === storageSource || storageSource === "all",
                )
                .filter(
                  (file) =>
                    file.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    file.tags.some((tag) =>
                      tag.toLowerCase().includes(searchQuery.toLowerCase()),
                    ),
                )
                .map((file) =>
                  viewMode === "grid" ? (
                    <Card
                      key={file.id}
                      className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="relative h-48 bg-gray-100">
                        <img
                          src={file.thumbnail}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                        {file.duration && (
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                            <i className="fas fa-play mr-1"></i>
                            {file.duration}
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium truncate">{file.name}</h3>
                        <div className="flex justify-between items-center mt-1 text-sm text-gray-500">
                          <span>{file.size}</span>
                          <span>{file.date}</span>
                        </div>
                        <div className="flex mt-2 flex-wrap gap-1">
                          {file.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="!rounded-button whitespace-nowrap"
                        >
                          <i className="fas fa-plus mr-1"></i>
                          添加到图集
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="!rounded-button whitespace-nowrap"
                            >
                              <i className="fas fa-ellipsis-h"></i>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <i className="fas fa-eye mr-2"></i>
                              查看详情
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <i className="fas fa-download mr-2"></i>
                              下载
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <i className="fas fa-share-alt mr-2"></i>
                              分享
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500">
                              <i className="fas fa-trash-alt mr-2"></i>
                              删除
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardFooter>
                    </Card>
                  ) : (
                    <Card
                      key={file.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex p-4">
                        <div className="w-20 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={file.thumbnail}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{file.name}</h3>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="!rounded-button whitespace-nowrap"
                              >
                                <i className="fas fa-plus"></i>
                              </Button>
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
                          </div>
                          <div className="flex justify-between items-center mt-1 text-sm text-gray-500">
                            <div className="flex items-center">
                              <span className="mr-4">{file.size}</span>
                              <span>{file.date}</span>
                              {file.duration && (
                                <span className="ml-4">
                                  <i className="fas fa-play mr-1"></i>
                                  {file.duration}
                                </span>
                              )}
                            </div>
                            <div className="flex gap-1">
                              {file.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ),
                )}
            </div>
            {/* 上传进度示例 */}
            <div className="fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-4 bg-blue-500 text-white flex justify-between items-center">
                <h3 className="font-medium">文件上传中</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-white hover:bg-blue-600 !rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-times"></i>
                </Button>
              </div>
              <div className="p-4">
                <div className="flex justify-between mb-1 text-sm">
                  <span>风景照片_001.raw</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="mt-2 text-xs text-gray-500">
                  <i className="fas fa-cog fa-spin mr-1"></i>
                  正在处理：RAW 转换、生成缩略图、AI 标签识别
                </div>
              </div>
            </div>
          </div>
        )}
        {/* 图集管理 */}
        {activeNav === "albums" && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">图集管理</h1>
              <Button className="!rounded-button whitespace-nowrap">
                <i className="fas fa-folder-plus mr-2"></i>
                新建图集
              </Button>
            </div>
            <Tabs defaultValue="all" className="mb-6">
              <TabsList>
                <TabsTrigger value="all">全部图集</TabsTrigger>
                <TabsTrigger value="auto">自动生成</TabsTrigger>
                <TabsTrigger value="manual">手动创建</TabsTrigger>
                <TabsTrigger value="shared">已分享</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="grid grid-cols-3 gap-6">
              {albums.map((album) => (
                <Card
                  key={album.id}
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate({ to: '/admin/atlas/atlas', params: { id: album.id.toString() } })}
                >
                  <div className="relative h-48 bg-gray-100">
                      <img
                        src={album.cover}
                        alt={album.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                        <h3 className="font-medium text-white">{album.name}</h3>
                        <p className="text-sm text-gray-200">
                          {album.count} 张照片
                        </p>
                      </div>
                  </div>
                  <CardFooter className="p-4 flex justify-between">
                    <div className="text-sm text-gray-500">{album.date}</div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="!rounded-button whitespace-nowrap"
                      >
                        <i className="fas fa-edit"></i>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="!rounded-button whitespace-nowrap"
                      >
                        <i className="fas fa-share-alt"></i>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="!rounded-button whitespace-nowrap"
                          >
                            <i className="fas fa-ellipsis-h"></i>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <i className="fas fa-download mr-2"></i>
                            导出
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <i className="fas fa-lock mr-2"></i>
                            权限设置
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">
                            <i className="fas fa-trash-alt mr-2"></i>
                            删除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardFooter>
                </Card>
              ))}
              {/* 智能图集生成卡片 */}
              <Card className="border-dashed border-2 border-gray-300 flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-gray-50">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <i className="fas fa-magic text-blue-500 text-xl"></i>
                </div>
                <h3 className="font-medium text-center">AI 智能生成图集</h3>
                <p className="text-sm text-gray-500 text-center mt-2">
                  基于时间、地点、主题自动整理照片
                </p>
                <Button
                  variant="outline"
                  className="mt-4 !rounded-button whitespace-nowrap"
                >
                  开始生成
                </Button>
              </Card>
            </div>
          </div>
        )}
        {/* 分享中心 */}
        {activeNav === "share" && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">分享中心</h1>
              <Button className="!rounded-button whitespace-nowrap">
                <i className="fas fa-share-alt mr-2"></i>
                创建分享
              </Button>
            </div>
            <Tabs defaultValue="active" className="mb-6">
              <TabsList>
                <TabsTrigger value="active">有效分享</TabsTrigger>
                <TabsTrigger value="expired">已过期</TabsTrigger>
                <TabsTrigger value="client">客户协作</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      分享内容
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      分享方式
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      访问权限
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      创建时间
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      有效期
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      浏览次数
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden">
                          <img
                            src={albums[0].cover}
                            alt=""
                            className="h-10 w-10 object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            西藏之旅
                          </div>
                          <div className="text-sm text-gray-500">
                            图集 • 127张照片
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        链接分享
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">密码访问</div>
                      <div className="text-sm text-gray-500">密码: 123456</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      2025-03-30
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">30天</div>
                      <div className="text-sm text-gray-500">剩余28天</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      86次
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="!rounded-button whitespace-nowrap"
                        >
                          <i className="fas fa-copy"></i>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="!rounded-button whitespace-nowrap"
                        >
                          <i className="fas fa-cog"></i>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 !rounded-button whitespace-nowrap"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden">
                          <img
                            src={albums[2].cover}
                            alt=""
                            className="h-10 w-10 object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            2024春装新品
                          </div>
                          <div className="text-sm text-gray-500">
                            图集 • 54张照片
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        客户协作
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">指定用户</div>
                      <div className="text-sm text-gray-500">3个用户</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      2025-03-15
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">永久</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      42次
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="!rounded-button whitespace-nowrap"
                        >
                          <i className="fas fa-copy"></i>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="!rounded-button whitespace-nowrap"
                        >
                          <i className="fas fa-cog"></i>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 !rounded-button whitespace-nowrap"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* 社区互动 */}
        {activeNav === "community" && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">社区互动</h1>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="!rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-user-plus mr-2"></i>
                  关注摄影师
                </Button>
                <Button className="!rounded-button whitespace-nowrap">
                  <i className="fas fa-edit mr-2"></i>
                  发布作品
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>推荐作品</CardTitle>
                    <CardDescription>根据你的兴趣推荐</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {communityPosts.map((post) => (
                        <div
                          key={post.id}
                          className="bg-gray-50 rounded-lg overflow-hidden"
                        >
                          <div className="p-4 flex items-center">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={post.user.avatar} />
                              <AvatarFallback>
                                {post.user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="ml-3">
                              <h4 className="font-medium">{post.user.name}</h4>
                              <p className="text-xs text-gray-500">2小时前</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-auto !rounded-button whitespace-nowrap"
                            >
                              <i className="fas fa-user-plus mr-1"></i>
                              关注
                            </Button>
                          </div>
                          <div>
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-64 object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium text-lg">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 mt-2">
                              分享一些我最近拍摄城市夜景的心得体会，这些照片是在上海陆家嘴金融区拍摄的，使用了长曝光技术捕捉城市灯光...
                            </p>
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex space-x-4">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="!rounded-button whitespace-nowrap"
                                >
                                  <i className="fas fa-heart mr-1 text-red-500"></i>
                                  {post.likes}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="!rounded-button whitespace-nowrap"
                                >
                                  <i className="fas fa-comment mr-1"></i>
                                  {post.comments}
                                </Button>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="!rounded-button whitespace-nowrap"
                              >
                                <i className="fas fa-share-alt mr-1"></i>
                                分享
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full !rounded-button whitespace-nowrap"
                    >
                      加载更多
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>摄影活动</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <Badge>进行中</Badge>
                          <span className="text-xs text-gray-500">剩余7天</span>
                        </div>
                        <h4 className="font-medium mt-2">春季风光摄影大赛</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          以"春的气息"为主题，记录春天的美丽景色
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 !rounded-button whitespace-nowrap"
                        >
                          查看详情
                        </Button>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">即将开始</Badge>
                          <span className="text-xs text-gray-500">4月10日</span>
                        </div>
                        <h4 className="font-medium mt-2">城市建筑摄影展</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          探索城市建筑的几何美学与人文情怀
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 !rounded-button whitespace-nowrap"
                        >
                          预约提醒
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>推荐关注</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="https://public.readdy.ai/ai/img_res/9df97e5c1aa514e1dac3a9b651208b7f.jpg" />
                            <AvatarFallback>陈</AvatarFallback>
                          </Avatar>
                          <div className="ml-3">
                            <h4 className="font-medium">陈光摄影</h4>
                            <p className="text-xs text-gray-500">风光摄影师</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="!rounded-button whitespace-nowrap"
                        >
                          关注
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="https://public.readdy.ai/ai/img_res/b987e966179d0d0f9828b980224c61cd.jpg" />
                            <AvatarFallback>林</AvatarFallback>
                          </Avatar>
                          <div className="ml-3">
                            <h4 className="font-medium">林雨工作室</h4>
                            <p className="text-xs text-gray-500">人像摄影师</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="!rounded-button whitespace-nowrap"
                        >
                          关注
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="https://public.readdy.ai/ai/img_res/6f5a89c9e3130ffefecb36728e11da26.jpg" />
                            <AvatarFallback>王</AvatarFallback>
                          </Avatar>
                          <div className="ml-3">
                            <h4 className="font-medium">王晓明</h4>
                            <p className="text-xs text-gray-500">街拍摄影师</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="!rounded-button whitespace-nowrap"
                        >
                          关注
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
        {/* 数据统计 */}
        {activeNav === "stats" && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">数据统计</h1>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="!rounded-button whitespace-nowrap"
                  >
                    最近30天
                    <i className="fas fa-chevron-down ml-2"></i>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>最近7天</DropdownMenuItem>
                  <DropdownMenuItem>最近30天</DropdownMenuItem>
                  <DropdownMenuItem>最近90天</DropdownMenuItem>
                  <DropdownMenuItem>今年</DropdownMenuItem>
                  <DropdownMenuItem>全部时间</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>存储使用情况</CardTitle>
                  <CardDescription>按文件类型统计</CardDescription>
                </CardHeader>
                <CardContent>
                  <div id="storage-chart" key="storage-chart" className="h-80"></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>作品访问统计</CardTitle>
                  <CardDescription>最近7天访问量</CardDescription>
                </CardHeader>
                <CardContent>
                  <div id="visits-chart" key="visits-chart" className="h-80"></div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>热门作品排行</CardTitle>
                <CardDescription>访问量最高的作品</CardDescription>
              </CardHeader>
              <CardContent>
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        作品
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        所属图集
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        访问量
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        分享次数
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        下载次数
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        点赞数
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {files.slice(0, 5).map((file, index) => (
                      <tr key={file.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden">
                              <img
                                src={file.thumbnail}
                                alt=""
                                className="h-10 w-10 object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {file.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {index % 3 === 0
                            ? "西藏之旅"
                            : index % 3 === 1
                              ? "城市建筑"
                              : "2024春装新品"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {Math.floor(Math.random() * 500) + 100}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {Math.floor(Math.random() * 50) + 5}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {Math.floor(Math.random() * 30) + 2}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {Math.floor(Math.random() * 100) + 10}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
