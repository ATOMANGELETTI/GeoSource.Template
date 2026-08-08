# GIS Spatial Engine Examples

## Example Rust Spatial Query
```rust
use geo::{Polygon, Coord};
use rstar::RTree;

// Build RTree for spatial fast bounding-box filtering
let mut tree = RTree::new();
```
