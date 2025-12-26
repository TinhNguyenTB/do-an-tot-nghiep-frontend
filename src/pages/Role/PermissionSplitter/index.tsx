import { useInfiniteQuery } from '@tanstack/react-query'
import { Checkbox, Typography, Spin, Tag, Input } from 'antd'
import { Splitter } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { fetchPermissionInfinite, PERMISSIONS_QUERY_KEY } from '@/services/permission'
import { Permission } from '@/services/permission/type'

interface PermissionSplitterProps {
  value?: Permission[]
  onChange: (value: Permission[]) => void
}

export function PermissionSplitter({ value = [], onChange }: PermissionSplitterProps) {
  const [selected, setSelected] = useState<Permission[]>([])
  const [search, setSearch] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')

  useEffect(() => {
    setSelected(value)
  }, [value])

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [PERMISSIONS_QUERY_KEY, { search: searchKeyword }],
    queryFn: fetchPermissionInfinite,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const meta = lastPage.data.meta
      return meta.hasNextPage ? meta.currentPage + 1 : undefined
    }
  })

  const permissions = useMemo(() => data?.pages.flatMap((page) => page.data.content) ?? [], [data])

  const loadMoreRef = useInfiniteScroll(() => fetchNextPage(), hasNextPage && !isFetchingNextPage)

  const togglePermission = (permission: Permission) => {
    setSelected((prev) => {
      const existed = prev.find((p) => p.name === permission.name)

      const next = existed ? prev.filter((p) => p.name !== permission.name) : [...prev, permission]

      onChange(next)
      return next
    })
  }

  return (
    <Splitter style={{ height: 450 }} className='border border-dashed border-blue-500'>
      {/* ===== LEFT ===== */}
      <Splitter.Panel defaultSize='50%' min='30%'>
        <Typography.Title level={5} className='text-center'>
          Danh sách quyền
        </Typography.Title>

        <div className='px-4 mb-2'>
          <Input.Search
            placeholder='Tìm kiếm...'
            allowClear
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSearch={(value) => {
              setSearchKeyword(value)
            }}
          />
        </div>

        <div className='overflow-auto h-[350px] px-4 space-y-2'>
          {permissions.map((p) => (
            <div key={p.name} className='block'>
              <Checkbox
                checked={selected.some((s) => s.name === p.name)}
                onChange={() => togglePermission(p)}
              >
                {p.description}
              </Checkbox>
            </div>
          ))}

          <div ref={loadMoreRef} />

          {isFetchingNextPage && (
            <div className='text-center py-2'>
              <Spin size='small' />
            </div>
          )}
        </div>
      </Splitter.Panel>

      {/* ===== RIGHT ===== */}
      <Splitter.Panel>
        <Typography.Title level={5} className='text-center'>
          Quyền đã chọn
        </Typography.Title>

        <div className='px-4 space-y-1'>
          {selected.map((p) => (
            <Tag
              key={p.name}
              closable
              onClose={() => togglePermission(p)}
              style={{
                margin: '0.2rem',
                padding: '0.2rem'
              }}
            >
              {p.description}
            </Tag>
          ))}
        </div>
      </Splitter.Panel>
    </Splitter>
  )
}
