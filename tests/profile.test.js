import assert from 'node:assert/strict'
import test from 'node:test'
import { myProfileData } from '../src/data/profile.js'

test('each linked project points to a specific repository, not a profile page', () => {
  const accountPages = new Set([
    myProfileData.personalInfo.github,
    myProfileData.personalInfo.githubAlt,
  ].map((url) => new URL(url).pathname.replace(/\/$/, '')))

  for (const project of myProfileData.projects) {
    if (!project.githubRepo) continue

    const url = new URL(project.githubRepo)
    assert.equal(url.hostname, 'github.com', `${project.title} must link to GitHub`)
    assert.match(url.pathname, /^\/[^/]+\/[^/]+\/?$/, `${project.title} must link to a repository`)
    assert.ok(!accountPages.has(url.pathname.replace(/\/$/, '')), `${project.title} points to a profile page`)
  }
})

test('hands-on and theory-only skills stay in separate groups', () => {
  const practiced = new Set(myProfileData.skills.practiced.map((skill) => skill.name))
  const learning = new Set(myProfileData.skills.learning.map((skill) => skill.name))

  assert.ok(practiced.has('Linux'))
  assert.ok(practiced.has('Docker'))
  assert.ok(practiced.has('Ansible'))
  assert.ok(practiced.has('AWS EC2'))
  assert.ok(learning.has('Terraform'))
  assert.ok(learning.has('Kubernetes'))
  for (const skill of practiced) assert.ok(!learning.has(skill), `${skill} appears in both groups`)
})
