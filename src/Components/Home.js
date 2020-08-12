import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ImageGrid from './ImageGrid';
import { imageData } from './ImageData';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ModalData from "./ModalData";
import './home.css';

class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            search: "",
            image: "",
            open: false
        }
    }
    componentDidMount = () => {
        this.setState({ data: imageData })
    }

    onInput = e => this.setState({ [e.target.id]: e.target.value });
    onFocus = e => e.target.parentNode.parentNode.classList.add('focus');
    onBlur = e => e.target.parentNode.parentNode.classList.remove('focus');
    onClickItem = item => this.setState({
        search: "",
        image: item
    });

    showNull = () => {
        this.props.history.push(`/`);
    }

    handleClose = () => {
        this.setState({open:false})
    }

    handleOpen = () => {
        this.setState({open:true})
    }

    render() {
        let { data, search, image } = this.state;
        if (!data) {
            return <p>Loading</p>
        }
        let filtered = data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="lg">
                    <Typography component="div" style={{ height: '100vh' }}>
                        <div>
                            <div className="wrapper">
                                <div className="search">
                                    <input
                                        id="search"
                                        type="search"
                                        value={this.state.search}
                                        placeholder="Search for images here..."
                                        onChange={this.onInput}
                                        onFocus={this.onFocus}
                                        onBlur={this.onBlur}
                                        autocomplete="off"
                                    />
                                    <i class="fa fa-search"></i>
                                </div>
                                {search.length > 1 && filtered.length > 0 && (
                                    <ul className="list">
                                        {filtered.map(item => (
                                            <li onClick={() => this.onClickItem(item)}>{item.name}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {image && (
                                <div>
                                    <div className="show-result-clear">
                                        <b className="show-right">Search results:</b>
                                        <Button variant="outlined" className="show-left" onClick={() => this.showNull()}>Clear</Button>
                                    </div>
                                    <GridListTile className="search-image-style" onClick = {() => this.handleOpen()}>
                                        <img src={image.img} alt={image.name} />
                                        <GridListTileBar
                                            title={<span>image by: <span className="add-name-color">{image.name}</span></span>}
                                        />
                                    </GridListTile>
                                </div>
                            )}
                        </div>
                        {!image && <ImageGrid
                            currentPage={this.state.currentPage}
                            pageSize={this.state.pageSize}
                        />}
                    </Typography>
                </Container>
                <ModalData
            open={this.state.open}
            handleClose={this.handleClose}
            imageUrl = {image.img}
            imageName = {image.name}/>
            </React.Fragment>
        )
    }
}

export default withRouter(HomeComponent);