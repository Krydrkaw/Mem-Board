import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import {MemCardInformation} from "./MemsPage";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Delete} from "@material-ui/icons";
import {Api} from "../../common/FakeApi";
import {Plus} from "react-bootstrap-icons";
import {Box, Divider} from "@material-ui/core";
import {IconContainerProps, Rating} from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 800,
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
        image: {
            flex: 1,
            textAlign: 'center'
        }
    }),
);

export interface MemProperty {
    mem: MemCardInformation;
    isAuthenticated: boolean;
    onDelete: () => void;
    onAddComment: (memInfo: MemCardInformation) => void;
}

export default function MemCard(prop: MemProperty) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [value, setValue] = React.useState<number | null>(2);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleDeleteClick = () => {
        Api.deleteMemById(prop.mem.id);
        prop.onDelete();
    };

    const handlePlusCommentClick = () => {
        prop.onAddComment(prop.mem);
    };


    let delteIcon;
    if (prop.isAuthenticated) {
        delteIcon =
            <IconButton onClick={handleDeleteClick} aria-label="settings">
                <Delete/>
            </IconButton>
    }

    const customIcons: { [index: string]: { icon: React.ReactElement; label: string } } = {
        1: {
            icon: <SentimentVeryDissatisfiedIcon/>,
            label: 'Very Dissatisfied',
        },
        2: {
            icon: <SentimentDissatisfiedIcon/>,
            label: 'Dissatisfied',
        },
        3: {
            icon: <SentimentSatisfiedIcon/>,
            label: 'Neutral',
        },
        4: {
            icon: <SentimentSatisfiedAltIcon/>,
            label: 'Satisfied',
        },
        5: {
            icon: <SentimentVerySatisfiedIcon/>,
            label: 'Very Satisfied',
        },
    };

    function IconContainer(props: IconContainerProps) {
        const {value, ...other} = props;
        return <span {...other}>{customIcons[value].icon}</span>;
    }

    return (
        <div>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            A
                        </Avatar>
                    }
                    action={delteIcon}
                    title={prop.mem.nazwa}
                    subheader={prop.mem.data}
                />

                <div className={classes.image}>
                    <img src={prop.mem.base64}/>
                </div>

                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {prop.mem.podpis}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>

                    <Box component="fieldset" mb={3} borderColor="transparent">
                        <Typography component="legend">Ocena</Typography>
                        <Rating
                            name={prop.mem.id}
                            defaultValue={2}
                            getLabelText={(value: number) => customIcons[value].label}
                            IconContainerComponent={IconContainer}
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                    </Box>

                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon/>
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {prop.mem.komentarze.map((koment, i) =>
                            (
                                <div key={i}>
                                    <Typography style={{marginTop: "40px"}} paragraph>
                                        {koment}
                                    </Typography>
                                    <Divider style={{marginTop: "6px"}}/>
                                </div>
                            )
                        )}

                        <IconButton onClick={handlePlusCommentClick} style={{marginTop: "50px"}}
                                    aria-label="add new comment">
                            <Plus/>
                        </IconButton>

                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
}
