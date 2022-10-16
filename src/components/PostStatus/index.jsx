import './styles.scss'

const PostStatus = props => {
  let text = 'Trạng thái không có',
    statusClass = 'not-available'

  switch (props.status) {
    case 1: {
      text = 'Đang đăng tuyển'
      statusClass = 'active'
      break
    }
    case 4: {
      text = 'Đã đóng'
      statusClass = 'disable'
      break
    }
    default: {
    }
  }

  return (
    <div className={`post-status__container ${statusClass}`}>
      <p className="post-status__text">{text}</p>
    </div>
  )
}

export default PostStatus
