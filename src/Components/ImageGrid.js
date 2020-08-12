import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { imageData } from './ImageData';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import ModalData from "./ModalData";
import 'bootstrap/dist/css/bootstrap.css';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: "80%",
        height: 'auto',
        overflow: 'hidden',
    },
    gridListTile: {
        width: '30%',
    },
}));

export default function ImageGrid(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [imageName, imageName2] = React.useState(null);
    const [imageUrl, imageUrl2] = React.useState(null);
    const [pageSize] = React.useState(9);
    const [currentPage, currentPage1] = React.useState(0);
    const pagesCount = Math.ceil(imageData.length / pageSize);

    const handleOpen = (tile) => {
        setOpen(true);
        imageName2(tile.name)
        imageUrl2(tile.img)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const scrollToTop = (top) => {
        window.scrollTo({
            top: top ? top : 0,
            behavior: "smooth"
        });
    }

    const handleClick = (e, index) => {
        currentPage1(index)
        scrollToTop();
    }
    return (
        <div>
            <div className={classes.root}>
                <GridList cellHeight={180} cellWidth={100} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
                    </GridListTile>

                    {imageData.slice(
                        currentPage * pageSize,
                        (currentPage + 1) * pageSize
                    ).map((tile) => (
                        <GridListTile key={tile.id} className="add-width" onClick={() => handleOpen(tile)}>
                            <img src={tile.img} alt={tile.name} />
                            <GridListTileBar
                                title={<span>image by: <span className="add-name-color">{tile.name}</span></span>}
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
            <div>
                <Button variant="outlined" className="view-more" onClick={e => handleClick(e, currentPage + 1)}>View more</Button>
            </div>
            <div className="pagination-wrapper">

                <Pagination aria-label="Page navigation example">

                    <PaginationItem disabled={currentPage <= 0}>

                        <PaginationLink
                            onClick={e => handleClick(e, currentPage - 1)}
                            previous
                        />

                    </PaginationItem>

                    {[...Array(pagesCount)].map((page, i) =>
                        <PaginationItem active={i === currentPage} key={i}>
                            <PaginationLink onClick={e => handleClick(e, i)}>
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    )}

                    <PaginationItem disabled={currentPage >= pagesCount - 1}>

                        <PaginationLink
                            onClick={e => handleClick(e, currentPage + 1)}
                            next
                        />

                    </PaginationItem>

                </Pagination>
            </div>
            <ModalData
            open={open}
            handleClose={handleClose}
            imageUrl = {imageUrl}
            imageName = {imageName}/>
        </div>
    );
}