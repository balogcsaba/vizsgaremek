
import LeftSideBar from './LeftSideBar';
import Caroussel from './Caroussel';
import BookMain from './BookMain';
function MainLayout() {
  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-200 h-screen bg-transparent">
        <LeftSideBar/>
      </div>
      <div className="w-3/4 bg-white h-screen">
      <BookMain />
     
      </div>
    </div>
  );
}

export default MainLayout;
