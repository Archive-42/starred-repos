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

const ExternalLinkIconGlyph = () => {
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
        d="M10.745 8.6082C10.742 8.0352 11.204 7.5722 11.776 7.5722H11.78L15.941 7.5912C16.515 7.5942 16.983 8.0622 16.986 8.6362L17.005 12.7972C17.006 13.3712 16.543 13.8352 15.969 13.8322C15.394 13.8302 14.926 13.3622 14.924 12.7882L14.9163 11.0759L8.19297 17.7992C7.80197 18.1892 7.16797 18.1892 6.77797 17.7992C6.38797 17.4092 6.38797 16.7752 6.77797 16.3842L13.5013 9.66089L11.789 9.6532C11.215 9.6512 10.747 9.1832 10.745 8.6082Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const ExternalLinkIcon: React.FunctionComponent<GlyphProps> = (
  props,
) => {
  const { testId, dangerous_className, size, color, label, block } = props;
  return (
    <Icon
      testId={testId}
      size={size}
      dangerous_className={dangerous_className}
      color={color}
      block={block}
      label={label || 'ExternalLinkIcon'}
      glyph={ExternalLinkIconGlyph}
    />
  );
};
