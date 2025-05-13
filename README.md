# zk.asyncawake.studio

Share information without an intermediate data store.

## Design

The application information written on the page is encoded in a Base64-encoded ASCII string and stored in the hash of the URL. On a page reload, the hash is decoded and the application information is placed as it was when initially written. There is a limitation to this approach: a finite amount of data can be stored in the URL's hash. I will update this document with benchmarks soon.


## References

Inspired by [How to store your app's entire state in the url](https://www.scottantipa.com/store-app-state-in-urls).

## Roadmap

- Move all styles to TailwindCSS.
- Add encryption and decryption support.
- Improve code coverage.
- Research on how to add more data formats without making too many changes to the interface.

## License

MIT.
