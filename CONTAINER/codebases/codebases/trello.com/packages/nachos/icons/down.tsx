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

const DownIconGlyph = () => {
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
        d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const DownIcon: React.FunctionComponent<GlyphProps> = (props) => {
  const { testId, dangerous_className, size, color, label, block } = props;
  return (
    <Icon
      testId={testId}
      size={size}
      dangerous_className={dangerous_className}
      color={color}
      block={block}
      label={label || 'DownIcon'}
      glyph={DownIconGlyph}
    />
  );
};
