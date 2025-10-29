// Jest setup file for Next.js
import '@testing-library/jest-dom';
import React, { ReactNode } from 'react';
import { TextEncoder, TextDecoder } from 'util';

const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) =>
  React.createElement(React.Fragment, null, children);

// Mock next/head
jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: Wrapper,
  };
});

// Mock next/router
jest.mock('next/router', () => require('next-router-mock'));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) =>
    React.createElement('img', {
      ...props,
      alt: props.alt,
    }),
}));

// Add TextEncoder/TextDecoder for JSDOM
global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder;

// Mock fetch
// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
