module.exports = async (_client, oldthread, newthread) => {
    try {
        if (oldthread.archived && !newthread.archived) return thread.join()
    } catch(err) { console.log(err) }
}