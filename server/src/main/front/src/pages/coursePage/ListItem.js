import "./ListItem.css"

const ListItem = (color, first, second, third, fourth) => {
  return (
    <div className="list-item-cjw">
      <div className="flex-cjw">
        <div className="first">
          <h4>15 : 30</h4>
        </div>
        <div className="second">
          <h4>2번칸 글</h4>
        </div>
        <div className="third">
          <div className="prograss-bar"></div>
          <h4>3번칸 글</h4>
        </div>
      </div>
      <div className="fourth">
        <h4>4번칸 글</h4>
      </div>
    </div>
  )
}

export default ListItem