export default db => ({
  save() {
    return this.isValid && db.upsertAsync(this.doc.id, this.doc)
  },
})
