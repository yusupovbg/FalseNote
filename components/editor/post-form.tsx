"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
/* import ReactMarkdown from "react-markdown" */

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { useRef, useState } from "react"
import { createPlugins, Plate, RenderAfterEditable, withProps, PlateElement, PlateLeaf } from '@udecode/plate-common';
import { createParagraphPlugin, ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { createHeadingPlugin, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, KEYS_HEADING } from '@udecode/plate-heading';
import { createBlockquotePlugin, ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import { createCodeBlockPlugin, ELEMENT_CODE_BLOCK, ELEMENT_CODE_LINE, ELEMENT_CODE_SYNTAX } from '@udecode/plate-code-block';
import { createHorizontalRulePlugin, ELEMENT_HR } from '@udecode/plate-horizontal-rule';
import { createLinkPlugin, ELEMENT_LINK } from '@udecode/plate-link';
import { createListPlugin, ELEMENT_UL, ELEMENT_OL, ELEMENT_LI } from '@udecode/plate-list';
import { createImagePlugin, ELEMENT_IMAGE, createMediaEmbedPlugin, ELEMENT_MEDIA_EMBED } from '@udecode/plate-media';
import { createCaptionPlugin } from '@udecode/plate-caption';
import { createTablePlugin, ELEMENT_TABLE, ELEMENT_TR, ELEMENT_TD, ELEMENT_TH } from '@udecode/plate-table';
import { createExcalidrawPlugin, ELEMENT_EXCALIDRAW } from '@udecode/plate-excalidraw';
import { createBoldPlugin, MARK_BOLD, createItalicPlugin, MARK_ITALIC, createUnderlinePlugin, MARK_UNDERLINE, createStrikethroughPlugin, MARK_STRIKETHROUGH, createCodePlugin, MARK_CODE, createSubscriptPlugin, MARK_SUBSCRIPT, createSuperscriptPlugin, MARK_SUPERSCRIPT } from '@udecode/plate-basic-marks';
import { createFontColorPlugin, createFontBackgroundColorPlugin, createFontSizePlugin } from '@udecode/plate-font';
import { createHighlightPlugin, MARK_HIGHLIGHT } from '@udecode/plate-highlight';
import { createKbdPlugin, MARK_KBD } from '@udecode/plate-kbd';
import { createAlignPlugin } from '@udecode/plate-alignment';
import { createIndentPlugin } from '@udecode/plate-indent';
import { createLineHeightPlugin } from '@udecode/plate-line-height';
import { createAutoformatPlugin } from '@udecode/plate-autoformat';
import { createBlockSelectionPlugin } from '@udecode/plate-selection';
import { createComboboxPlugin } from '@udecode/plate-combobox';
import { createDndPlugin } from '@udecode/plate-dnd';
import { createExitBreakPlugin, createSoftBreakPlugin } from '@udecode/plate-break';
import { createNodeIdPlugin } from '@udecode/plate-node-id';
import { createNormalizeTypesPlugin } from '@udecode/plate-normalizers';
import { createResetNodePlugin } from '@udecode/plate-reset-node';
import { createSelectOnBackspacePlugin } from '@udecode/plate-select';
import { createTabbablePlugin } from '@udecode/plate-tabbable';
import { createTrailingBlockPlugin } from '@udecode/plate-trailing-block';
import { createDeserializeDocxPlugin } from '@udecode/plate-serializer-docx';
import { createDeserializeCsvPlugin } from '@udecode/plate-serializer-csv';
import { createDeserializeMdPlugin } from '@udecode/plate-serializer-md';
import { createJuicePlugin } from '@udecode/plate-juice';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BlockquoteElement } from '@/components/plate-ui/blockquote-element';
import { CodeBlockElement } from '@/components/plate-ui/code-block-element';
import { CodeLineElement } from '@/components/plate-ui/code-line-element';
import { CodeSyntaxLeaf } from '@/components/plate-ui/code-syntax-leaf';
import { ExcalidrawElement } from '@/components/plate-ui/excalidraw-element';
import { HrElement } from '@/components/plate-ui/hr-element';
import { ImageElement } from '@/components/plate-ui/image-element';
import { LinkElement } from '@/components/plate-ui/link-element';
import { LinkFloatingToolbar } from '@/components/plate-ui/link-floating-toolbar';
import { HeadingElement } from '@/components/plate-ui/heading-element';
import { ListElement } from '@/components/plate-ui/list-element';
import { MediaEmbedElement } from '@/components/plate-ui/media-embed-element';
import { ParagraphElement } from '@/components/plate-ui/paragraph-element';
import { TableElement } from '@/components/plate-ui/table-element';
import { TableRowElement } from '@/components/plate-ui/table-row-element';
import { TableCellElement, TableCellHeaderElement } from '@/components/plate-ui/table-cell-element';
import { CodeLeaf } from '@/components/plate-ui/code-leaf';
import { HighlightLeaf } from '@/components/plate-ui/highlight-leaf';
import { KbdLeaf } from '@/components/plate-ui/kbd-leaf';
import { Editor } from '@/components/plate-ui/editor';
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons';
import { withPlaceholders } from '@/components/plate-ui/placeholder';
import { withDraggables } from '@/components/plate-ui/with-draggables';
import { PlaygroundFixedToolbarButtons } from "../plate-ui/playground-fixed-toolbar-buttons"
import { PlaygroundFloatingToolbarButtons } from "../plate-ui/playground-floating-toolbar-buttons"

const plugins = createPlugins(
     [
       createParagraphPlugin(),
       createHeadingPlugin(),
       createBlockquotePlugin(),
       createCodeBlockPlugin(),
       createHorizontalRulePlugin(),
       createLinkPlugin({
         renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
       }),
       createListPlugin(),
       createImagePlugin(),
       createMediaEmbedPlugin(),
       createCaptionPlugin({
         options: {
           pluginKeys: [
             ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED
           ]
         },
       }),
       createTablePlugin(),
       createExcalidrawPlugin(),
       createBoldPlugin(),
       createItalicPlugin(),
       createUnderlinePlugin(),
       createStrikethroughPlugin(),
       createCodePlugin(),
       createSubscriptPlugin(),
       createSuperscriptPlugin(),
       createFontColorPlugin(),
       createFontBackgroundColorPlugin(),
       createFontSizePlugin(),
       createHighlightPlugin(),
       createKbdPlugin(),
       createAlignPlugin({
         inject: {
           props: {
             validTypes: [
               ELEMENT_PARAGRAPH,
               ELEMENT_H1, ELEMENT_H2, ELEMENT_H3
             ],
           },
         },
       }),
       createIndentPlugin({
         inject: {
           props: {
             validTypes: [
               ELEMENT_PARAGRAPH,
               ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK
             ],
           },
         },
       }),
       createLineHeightPlugin({
         inject: {
           props: {
             defaultNodeValue: 1.5,
             validNodeValues: [1, 1.2, 1.5, 2, 3],
             validTypes: [
               ELEMENT_PARAGRAPH,
               ELEMENT_H1, ELEMENT_H2, ELEMENT_H3
             ],
           },
         },
       }),
       createAutoformatPlugin({
         options: {
           rules: [
             // Usage: https://platejs.org/docs/autoformat
           ],
           enableUndoOnDelete: true,
         },
       }),
       createBlockSelectionPlugin({
         options: {
           sizes: {
             top: 0,
             bottom: 0,
           },
         },
       }),
       createComboboxPlugin(),
       createDndPlugin({
           options: { enableScroller: true },
       }),
       createExitBreakPlugin({
         options: {
           rules: [
             {
               hotkey: 'mod+enter',
             },
             {
               hotkey: 'mod+shift+enter',
               before: true,
             },
             {
               hotkey: 'enter',
               query: {
                 start: true,
                 end: true,
                 allow: KEYS_HEADING,
               },
               relative: true,
               level: 1,
             },
           ],
         },
       }),
       createNodeIdPlugin(),
       createNormalizeTypesPlugin(),
       createResetNodePlugin({
         options: {
           rules: [
             // Usage: https://platejs.org/docs/reset-node
           ],
         },
       }),
       createSelectOnBackspacePlugin({
         options: {
           query: {
             allow: [
               ELEMENT_IMAGE, ELEMENT_HR
             ],
           },
         },
       }),
       createSoftBreakPlugin({
         options: {
           rules: [
             { hotkey: 'shift+enter' },
             {
               hotkey: 'enter',
               query: {
                 allow: [
                   ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD
                 ],
               },
             },
           ],
         },
       }),
       createTabbablePlugin(),
       createTrailingBlockPlugin({
         options: { type: ELEMENT_PARAGRAPH },
       }),
       createDeserializeDocxPlugin(),
       createDeserializeCsvPlugin(),
       createDeserializeMdPlugin(),
       createJuicePlugin(),
     ],
     {
       components: withDraggables(withPlaceholders({
         [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
         [ELEMENT_CODE_BLOCK]: CodeBlockElement,
         [ELEMENT_CODE_LINE]: CodeLineElement,
         [ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
         [ELEMENT_EXCALIDRAW]: ExcalidrawElement,
         [ELEMENT_HR]: HrElement,
         [ELEMENT_IMAGE]: ImageElement,
         [ELEMENT_LINK]: LinkElement,
         [ELEMENT_H1]: withProps(HeadingElement, { variant: 'h1' }),
         [ELEMENT_H2]: withProps(HeadingElement, { variant: 'h2' }),
         [ELEMENT_H3]: withProps(HeadingElement, { variant: 'h3' }),
         [ELEMENT_UL]: withProps(ListElement, { variant: 'ul' }),
         [ELEMENT_OL]: withProps(ListElement, { variant: 'ol' }),
         [ELEMENT_LI]: withProps(PlateElement, { as: 'li' }),
         [ELEMENT_MEDIA_EMBED]: MediaEmbedElement,
         [ELEMENT_PARAGRAPH]: ParagraphElement,
         [ELEMENT_TABLE]: TableElement,
         [ELEMENT_TR]: TableRowElement,
         [ELEMENT_TD]: TableCellElement,
         [ELEMENT_TH]: TableCellHeaderElement,
         [MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
         [MARK_CODE]: CodeLeaf,
         [MARK_HIGHLIGHT]: HighlightLeaf,
         [MARK_ITALIC]: withProps(PlateLeaf, { as: 'em' }),
         [MARK_KBD]: KbdLeaf,
         [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: 's' }),
         [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: 'sub' }),
         [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: 'sup' }),
         [MARK_UNDERLINE]: withProps(PlateLeaf, { as: 'u' }),
       })),
     }
   );


const postFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters long.",
    })
    .max(100, {
      message: "Username must not be longer than 100 characters.",
    }),
  visibility: z
    .string({
      required_error: "Please select a visibility option.",
    }),
  content: z.string().min(4),
  topics: z
    .array(
      z.object({
        value: z.string(),
      })
    )
    .optional(),
})

type PostFormValues = z.infer<typeof postFormSchema>

// This can come from your database or API.
const defaultValues: Partial<PostFormValues> = {
  visibility: "public",
}

export function PostForm() {
  const containerRef = useRef(null);
  const initialValue = [
    {
      id: '1',
      type: ELEMENT_PARAGRAPH,
      children: [{ text: '' }],
    },
  ];
  const [editorHtml, setEditorHtml] = useState<string>('');
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const { fields, append } = useFieldArray({
    name: "topics",
    control: form.control,
  })

  function onSubmit(data: PostFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <div>
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
        <div className="mt-4">
        {/* <ReactMarkdown>{markdownContent}</ReactMarkdown> */}
      </div>
        </div>
      ),
    })
  }


  // Update markdownContent when the content field changes
  function handleContentChange(value: string) {
    setEditorHtml(value);
    form.setValue('content', value);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        {/* <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Title of the post" {...field} />
              </FormControl>
             <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <DndProvider backend={HTML5Backend}>
        <Plate plugins={plugins} initialValue={initialValue}>
          <div
            ref={containerRef}
            className={cn(
              // Block selection
              '[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4'
            )}
          >
            <FixedToolbar>
              <PlaygroundFixedToolbarButtons />
            </FixedToolbar>

            <Input placeholder="Title of the post" />
            
            <Editor
              autoFocus
              focusRing={false}
              variant="ghost"
              size="md"
              placeholder="Content of the post"
            />


            <FloatingToolbar>
              <PlaygroundFloatingToolbarButtons />
            </FloatingToolbar>
          </div>
        </Plate>
    </DndProvider>
        {/* <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
              <DndProvider backend={HTML5Backend}>
      <Plate plugins={plugins} >
        <FixedToolbar>
          <FixedToolbarButtons />
        </FixedToolbar>
        
        <Editor />
        
        <FloatingToolbar>
          <FloatingToolbarButtons />
        </FloatingToolbar>
      </Plate>
    </DndProvider>
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}