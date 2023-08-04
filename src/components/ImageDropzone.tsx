import { Group, Text, useMantineTheme, rem, SimpleGrid, Image, Button } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import React, { useRef, useState, useEffect } from 'react';

export function ImageDropzone(props: Partial<DropzoneProps>) {
  const theme = useMantineTheme();
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [previews, setPreviews] = useState<React.ReactNode[]>([]);

  const handleReset = () => {
    setFiles([]);
    setPreviews([]);
  };

  useEffect(() => {
    const newPreviews = files.map((file, index) => {
      const imageUrl = URL.createObjectURL(file);
      return (
        <Image
          key={index}
          src={imageUrl}
          imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
          alt=''
        />
      );
    });
    setPreviews(newPreviews);
  }, [files]);

  
  return (
    <div>
        <Dropzone
          onDrop={setFiles}
          onReject={(files) => console.log('rejected files', files)}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          {...props}
          activateOnClick={true}
        >
      <Group position="center" spacing="xl" style={{ minHeight: rem(220), pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload
            size="3.2rem"
            stroke={1.5}
            color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
          />
          <div>
              <Text size="xl" inline>
                Dragged Image is Accepted
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                The Attached File is Allowed and Does Not Exceed the Maximum File Required
              </Text>
          </div>
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            size="3.2rem"
            stroke={1.5}
            color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
          />
          <div>
              <Text size="xl" inline>
                Dragged Image is Rejected
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                The Attached File is not allowed or File Size exceeded.
              </Text>
          </div>
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto size="3.2rem" stroke={1.5} />
          <div>
              <Text size="xl" inline>
                Drag images here or click to select files
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                Attach ONLY ONE FILE, file should not exceed 5mb.         
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                once the file has been dropped/attached, it's not redoable.
              </Text>
          </div>
        </Dropzone.Idle>
      </Group>
    </Dropzone>
</div>
  );
}