// this component was automatically generated by IconGlyph.template.js
import React from 'react';
import { TestId } from '@trello/test-ids';

import { Icon, IconColor, IconSize } from '../src/components/Icon';

export interface GlyphProps {
  /**
   * A string that is applied as an aria attribute on the icon. Usually it
   * matches up with the display name of the icon
   * @default If no label is provided, it will fallback to the name of the icon
   */
  label?: string;
  /**
   * The color that the Icon should be rendered as.
   * @default @icon-default-color (#42526E)
   */
  color?: IconColor;
  /**
   * The size to render the Icon size.
   * @default "medium"
   */
  size?: IconSize;
  /**
   * A string that gets placed as a data attribute (data-test-id) onto the
   * Icon wrapper so that our
   * smoketest can properly target and test the component
   * @default undefined
   */
  testId?: TestId;
  // Escape hatches
  /**
   * ⚠️ DO NOT USE THIS PROP UNLESS YOU REALLY REALLY HAVE TO.
   *
   * Places a class name on the Icon (more specifically, the svg itself). This
   * is placed in addition to the classes already placed on the Icon. This is
   * placed directly onto the SVG via the glyph templates that are
   * generated by IconGlyph.template.js
   *
   * Please refrain from using this unless absolutely necessary.
   * @default undefined
   */
  dangerous_className?: string;
  /**
   * The switch for the icon to be centered in the dedicated space with padding around it.
   * Designed for cases when icon is not inline.
   */
  block?: boolean;
}

const NumberIconGlyph = () => {
  return (
    <svg
      width="24"
      height="24"
      role="presentation"
      focusable="false"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 4C8.44772 4 8 4.44772 8 5V8H5C4.44772 8 4 8.44772 4 9C4 9.55229 4.44772 10 5 10H8V14H5C4.44772 14 4 14.4477 4 15C4 15.5523 4.44772 16 5 16H8V19C8 19.5523 8.44772 20 9 20C9.55228 20 10 19.5523 10 19V16L14 16V19C14 19.5523 14.4477 20 15 20C15.5523 20 16 19.5523 16 19V16H19C19.5523 16 20 15.5523 20 15C20 14.4477 19.5523 14 19 14H16V10H19C19.5523 10 20 9.55228 20 9C20 8.44771 19.5523 8 19 8H16V5C16 4.44772 15.5523 4 15 4C14.4477 4 14 4.44772 14 5V8L10 8V5C10 4.44772 9.55228 4 9 4ZM10 10V14L14 14V10L10 10Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const NumberIcon: React.FunctionComponent<GlyphProps> = (props) => {
  const { testId, dangerous_className, size, color, label, block } = props;
  return (
    <Icon
      testId={testId}
      size={size}
      dangerous_className={dangerous_className}
      color={color}
      block={block}
      label={label || 'NumberIcon'}
      glyph={NumberIconGlyph}
    />
  );
};
