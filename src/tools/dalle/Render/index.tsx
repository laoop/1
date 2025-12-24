import { BuiltinRenderProps } from '@lobechat/types';
import { ActionIcon, PreviewGroup } from '@lobehub/ui';
import { Download } from 'lucide-react';
import { memo, useRef } from 'react';
import { Flexbox } from 'react-layout-kit';

import { fileService } from '@/services/file';
import { DallEImageItem } from '@/types/tool/dalle';

import GalleyGrid from './GalleyGrid';
import ImageItem from './Item';

const DallE = memo<BuiltinRenderProps<DallEImageItem[]>>(({ content, messageId }) => {
  const currentRef = useRef(0);

  const handleDownload = async () => {
    // 1. Retrieve the blob URL of an image by its imageId
    const id = content[currentRef.current]?.imageId;
    if (!id) return;
    const { url, name } = await fileService.getFile(id);
    // 2. Download the image
    const link = document.createElement('a');
    link.href = url;
    link.download = name; // 设置下载的文件名
    link.click();
  };

  return (
    <Flexbox gap={16}>
      {/* 没想好工具条的作用 */}
      {/*<ToolBar content={content} messageId={messageId} />*/}
      <PreviewGroup
        preview={{
          // 这里只保留下载按钮，不再尝试监听切换，彻底避开位置和逗号报错
          toolbarAddon: <ActionIcon color={'#fff'} icon={Download} onClick={handleDownload} />,
        }}
      >
        <GalleyGrid items={content.map((c) => ({ ...c, messageId }))} renderItem={ImageItem} />
      </PreviewGroup>
    </Flexbox>
  );
});

export default DallE;
