import React, { ReactNode } from 'react'
import { Badge, BadgeProps } from 'antd'

interface CoreBadgeProps extends BadgeProps, Omit<BadgeProps, 'count' | 'children' | 'onClick'> {
  children: ReactNode
  count?: number | ReactNode
  onClick?: () => void
}

const CoreBadgeComponent: React.FC<CoreBadgeProps> = ({ children, count, onClick, ...props }) => {
  let displayCount: ReactNode = count

  // Nếu 'count' là một số và có hàm click được cung cấp,
  // ta sẽ bọc số đó trong một <span> có style để hiển thị khả năng click.
  if (typeof count === 'number' && onClick) {
    displayCount = (
      <span onClick={onClick} style={{ cursor: 'pointer', userSelect: 'none' }}>
        {count}
      </span>
    )
  }

  // Nếu 'count' không phải là số (ví dụ: là một icon), ta vẫn có thể bọc nó nếu onClick tồn tại.
  if (typeof count !== 'number' && onClick && count) {
    displayCount = (
      <span
        onClick={onClick}
        style={{ cursor: 'pointer', userSelect: 'none', display: 'inline-flex' }}
      >
        {count}
      </span>
    )
  }

  return (
    <Badge count={displayCount} {...props}>
      {children}
    </Badge>
  )
}

export const CoreBadge = React.memo(CoreBadgeComponent) as typeof CoreBadgeComponent
