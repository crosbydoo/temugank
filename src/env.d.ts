/// <reference path="../.astro/types.d.ts" />
/// <reference path="../worker-configuration.d.ts" />

declare namespace App {
  interface Locals {
    user?: { email: string; role: 'admin' }
  }
}
