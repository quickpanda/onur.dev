import { Suspense, useState } from 'react'
import dynamic from 'next/dynamic'
import { CopyToClipboard } from 'react-copy-to-clipboard'
const { spacing } = require('tailwindcss/defaultTheme')
const DynamicSyntaxHighlighter = dynamic(() => import('react-syntax-highlighter/dist/cjs/prism-async-light'), {
  suspense: true
})
const colors = require('tailwindcss/colors')

// --- Components
import ShowInView from 'components/ShowInView'
import { OutlineButton } from 'components/Button'

const ControlPlaceholder = () => <span className="w-4 h-4 bg-gray-200 rounded-full" />

export default function CodeBlock({ title, language, code }) {
  const [copied, setCopied] = useState(false)

  const onCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <ShowInView rootMargin="50px">
      <Suspense fallback={null}>
        <div className="flex items-center justify-between py-1.5 pl-4 pr-2 rounded-t-lg bg-gray-50 border border-gray-200">
          {title ? (
            <div className="flex items-center gap-x-4">
              <span className="inline-flex items-center gap-x-1.5">
                <ControlPlaceholder />
                <ControlPlaceholder />
                <ControlPlaceholder />
              </span>
              <p className="m-0 text-sm font-medium">{title}</p>
            </div>
          ) : (
            <span />
          )}
          <CopyToClipboard text={code} onCopy={!copied && onCopy}>
            <OutlineButton as="button" className="!py-1 !px-2 !text-xs !gap-x-1" disabled={copied}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              {copied ? 'Copied' : 'Copy'}
            </OutlineButton>
          </CopyToClipboard>
        </div>
        <div className="pre-code">
          <DynamicSyntaxHighlighter
            language={language}
            showLineNumbers
            wrapLongLines={false} // white-space: pre
            customStyle={{ backgroundColor: '' }}
            lineNumberStyle={{
              minWidth: spacing[4],
              paddingRight: 0,
              marginRight: spacing[6],
              color: colors.gray[400]
            }}
          >
            {code}
          </DynamicSyntaxHighlighter>
        </div>
      </Suspense>
    </ShowInView>
  )
}