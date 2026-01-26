import {
  BarChart3,
  Bell,
  Calendar,
  ChevronDown,
  Download,
  FileText,
  Filter,
  Folder,
  LayoutGrid,
  LogOut,
  Mail,
  Moon,
  MoreHorizontal,
  Pin,
  Plus,
  Search,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
              <div className="bg-white rounded-sm"></div>
              <div className="bg-white rounded-sm"></div>
              <div className="bg-white rounded-sm"></div>
              <div className="bg-white rounded-sm"></div>
            </div>
          </div>
          <span className="font-semibold text-lg">Allout</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1">
          <Button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:bg-gray-50 rounded-lg text-sm">
            <LayoutGrid className="w-4 h-4" />
            <span>Dashboard</span>
            <ChevronDown className="w-4 h-4 ml-auto" />
          </Button>

          <Button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:bg-gray-50 rounded-lg text-sm">
            <Mail className="w-4 h-4" />
            <span>Mailbox</span>
            <ChevronDown className="w-4 h-4 ml-auto" />
          </Button>

          <Button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:bg-gray-50 rounded-lg text-sm">
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
            <ChevronDown className="w-4 h-4 ml-auto" />
          </Button>

          <div>
            <Button className="w-full flex items-center gap-3 px-3 py-2.5 bg-blue-600 text-white rounded-lg text-sm">
              <Folder className="w-4 h-4" />
              <span>Projects</span>
              <ChevronDown className="w-4 h-4 ml-auto" />
            </Button>
            <div className="ml-8 mt-1 space-y-1">
              {/* <a href="#" className="block px-3 py-2 text-blue-600 text-sm">
                Project List
              </a>
              <a href="#" className="block px-3 py-2 text-gray-400 text-sm">
                Overview
              </a>
              <a href="#" className="block px-3 py-2 text-gray-400 text-sm">
                Create Project
              </a> */}
            </div>
          </div>

          <Button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:bg-gray-50 rounded-lg text-sm">
            <FileText className="w-4 h-4" />
            <span>Report</span>
            <ChevronDown className="w-4 h-4 ml-auto" />
          </Button>

          <Button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:bg-gray-50 rounded-lg text-sm">
            <Settings className="w-4 h-4" />
            <span>Setting</span>
            <ChevronDown className="w-4 h-4 ml-auto" />
          </Button>
        </nav>

        {/* Logout */}
        <div className="p-4">
          <Button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:bg-gray-50 rounded-lg text-sm">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <Button className="p-2 hover:bg-gray-50 rounded-lg">
                <Moon className="w-5 h-5 text-gray-400" />
              </Button>
              <Button className="p-2 hover:bg-gray-50 rounded-lg">
                <Bell className="w-5 h-5 text-gray-400" />
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Columbus</span>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  {/*   <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                  </svg> */}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto px-8 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <span>Projects</span>
            <span>›</span>
            <span>Columbus</span>
            <span>›</span>
            <span className="text-gray-900">Projects List</span>
          </div>

          {/* Page Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-semibold">Projects List</h1>
                <Pin className="w-5 h-5 text-red-500 fill-red-500" />
              </div>
              <p className="text-sm text-gray-500">Here is a list of projects that you have created</p>
            </div>

            <div className="flex items-center gap-3">
              {/* Avatar Group */}
              <div className="flex items-center">
                {/*   <img
                  src="https://i.pravatar.cc/150?img=1"
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <img
                  src="https://i.pravatar.cc/150?img=2"
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-white -ml-2"
                />
                <img
                  src="https://i.pravatar.cc/150?img=3"
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-white -ml-2"
                />
                <img
                  src="https://i.pravatar.cc/150?img=4"
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-white -ml-2"
                /> */}
                <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white -ml-2 flex items-center justify-center text-xs text-gray-600">
                  +4
                </div>
                <Button className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white -ml-2 flex items-center justify-center text-gray-600">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <Button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <Button className="flex items-center gap-2 pb-3 border-b-2 border-blue-600 text-blue-600 text-sm font-medium">
                Todo
                <span className="px-2 py-0.5 bg-blue-600 text-white rounded text-xs">3</span>
              </Button>
              <Button className="flex items-center gap-2 pb-3 border-b-2 border-transparent text-gray-500 text-sm">
                In Progress
                <span className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-xs">2</span>
              </Button>
              <Button className="flex items-center gap-2 pb-3 border-b-2 border-transparent text-gray-500 text-sm">
                Completed
                <span className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-xs">5</span>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                Filter & Sort
              </Button>
              <Button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                <Plus className="w-4 h-4" />
                Add New
              </Button>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-4 gap-6">
            {/* Project Card 1 */}
            <ProjectCard
              category="Web design"
              title="Twottr - Redesign Project"
              description="Here you will have a twitter web redesign project"
              projectName="Twottr Project"
              projectUrl="www.twottr.com"
              date="02 May 23"
              iconColor="bg-purple-100"
              icon="🎨"
              avatars={[1, 2, 3]}
            />

            {/* Project Card 2 */}
            <ProjectCard
              category="Mobile Design"
              title="Sudoku - Mobile App"
              description="Hello guys, here is the loom for this project. Keep it up!"
              projectName="Loom Video"
              projectUrl="www.loom.com"
              date="20 May 23"
              iconColor="bg-purple-100"
              icon="⚡"
              avatars={[5, 6]}
            />

            {/* Project Card 3 */}
            <ProjectCard
              category="Invoice"
              title="Yalla Invoice"
              description="Please check this invoice below and put all results into that file"
              projectName="Invoice Check Up"
              projectUrl="finn_project"
              date="26 Apr 23"
              iconColor="bg-yellow-100"
              icon="📄"
              avatars={[7, 8, 9]}
            />

            {/* Project Card 4 */}
            <ProjectCard
              category="App Developer"
              title="Ankara API"
              description="Here you will make a Twitter web redesign project. here"
              projectName="Ankara-project"
              projectUrl="www.ankara.com"
              date="21 Jun 23"
              iconColor="bg-orange-100"
              icon="🔥"
              avatars={[10, 11]}
            />

            {/* Project Card 5 */}
            <ProjectCard
              category="Dashboard"
              title="Maddog - Dashboard UI"
              description="Do it carefully and in accordance with the wishes of the client"
              projectName="Maddog Dashboard"
              projectUrl="www.figm.cc"
              date="12 May 23"
              iconColor="bg-purple-100"
              icon="🎨"
              avatars={[12, 13, 14]}
            />

            {/* Project Card 6 */}
            <ProjectCard
              category="Mobile Design"
              title="Noinoi - Mobile App"
              description="Hello guys, here is a brief file from the client. Good luck!"
              projectName="Loom Video"
              projectUrl="www.loom.com"
              date="03 Jul 23"
              iconColor="bg-purple-100"
              icon="⚡"
              avatars={[15, 16]}
            />

            {/* Project Card 7 */}
            <ProjectCard
              category="Web design"
              title="Shaka - Landing Page"
              description="Here I have provided the file for working on it. Here is also a brief..."
              projectName="Shaka Landing Page"
              projectUrl="www.figm.cc"
              date="02 Jun 23"
              iconColor="bg-purple-100"
              icon="🎨"
              avatars={[17, 18]}
            />

            {/* Project Card 8 */}
            <ProjectCard
              category="Web design"
              title="Gonial Landing Page"
              description="Here you will make a Landing Page. Good luck!"
              projectName="Gonial Landing Page"
              projectUrl="www.figm.cc sdn"
              date="11 Aug 23"
              iconColor="bg-purple-100"
              icon="🎨"
              avatars={[19, 20]}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

interface ProjectCardProps {
  category: string;
  title: string;
  description: string;
  projectName: string;
  projectUrl: string;
  date: string;
  iconColor: string;
  icon: string;
  avatars: number[];
}

function ProjectCard({
  category,
  title,
  description,
  projectName,
  projectUrl,
  date,
  iconColor,
  icon,
  // avatars,
}: ProjectCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow">
      {/* Category and Menu */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-blue-600 font-medium">{category}</span>
        <button type="button" className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Title and Description */}
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{description}</p>

      {/* Project Info */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
        <div className={`w-10 h-10 ${iconColor} rounded-lg flex items-center justify-center text-lg`}>{icon}</div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm text-gray-900 truncate">{projectName}</div>
          <div className="text-xs text-gray-400 truncate">{projectUrl}</div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {/* Avatar Group */}
        {/*  <div className="flex items-center">
          {avatars.map((num, index) => (
            <img
              key={num}
              src={`https://i.pravatar.cc/150?img=${num}`}
              alt="User"
              className={`w-7 h-7 rounded-full border-2 border-white ${index > 0 ? "-ml-2" : ""}`}
            />
          ))}
        </div> */}

        {/* Date */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Calendar className="w-3.5 h-3.5" />
          {date}
        </div>
      </div>
    </div>
  );
}
