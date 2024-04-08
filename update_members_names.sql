-- Update members_names and videos for boy groups
DO $$
DECLARE
    groupName TEXT;
BEGIN
    FOR groupName IN SELECT group_name FROM boy_groups LOOP
        EXECUTE '
            UPDATE boy_groups AS bg
            SET 
                members_names = (
                    SELECT ARRAY_AGG(i.stage_name)
                    FROM idols AS i
                    WHERE LOWER(i.group_name) = LOWER(bg.group_name)
                ),
                videos = (
                    SELECT ARRAY_AGG(v.video)
                    FROM videos AS v
                    WHERE LOWER(v.artist) = LOWER(bg.group_name)
                )
            WHERE LOWER(bg.group_name) = LOWER($1)
        ' USING groupName;
    END LOOP;
END $$;

-- Update members_names and videos for girl groups
DO $$
DECLARE
    groupName TEXT;
BEGIN
    FOR groupName IN SELECT group_name FROM girl_groups LOOP
        EXECUTE '
            UPDATE girl_groups AS gg
            SET 
                members_names = (
                    SELECT ARRAY_AGG(i.stage_name)
                    FROM idols AS i
                    WHERE LOWER(i.group_name) = LOWER(gg.group_name)
                ),
                videos = (
                    SELECT ARRAY_AGG(v.video)
                    FROM videos AS v
                    WHERE LOWER(v.artist) = LOWER(gg.group_name)
                )
            WHERE LOWER(gg.group_name) = LOWER($1)
        ' USING groupName;
    END LOOP;
END $$;

-- Function to update group profiles with newly added members
CREATE OR REPLACE FUNCTION update_group_members()
RETURNS TRIGGER AS $$
BEGIN
    -- Update boy group profiles
    UPDATE boy_groups AS bg
    SET 
        members_names = (
            SELECT ARRAY_AGG(i.stage_name)
            FROM idols AS i
            WHERE LOWER(i.group_name) = LOWER(bg.group_name)
        )
    WHERE NEW.group_name = bg.group_name;

    -- Update girl group profiles
    UPDATE girl_groups AS gg
    SET 
        members_names = (
            SELECT ARRAY_AGG(i.stage_name)
            FROM idols AS i
            WHERE LOWER(i.group_name) = LOWER(gg.group_name)
        )
    WHERE NEW.group_name = gg.group_name;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update group profiles when a new member is inserted
CREATE TRIGGER after_member_insert
AFTER INSERT ON idols
FOR EACH ROW
EXECUTE FUNCTION update_group_members();

-- Update group profiles with newly added video
CREATE OR REPLACE FUNCTION update_group_videos()
RETURNS TRIGGER AS $$
BEGIN
    -- Update boy group profiles
    UPDATE boy_groups AS bg
    SET 
        videos = (
            SELECT ARRAY_AGG(video)
            FROM videos
            WHERE LOWER(artist) = LOWER(bg.group_name)
        )
    WHERE NEW.artist = bg.group_name;

    -- Update girl group profiles
    UPDATE girl_groups AS gg
    SET 
        videos = (
            SELECT ARRAY_AGG(video)
            FROM videos
            WHERE LOWER(artist) = LOWER(gg.group_name)
        )
    WHERE NEW.artist = gg.group_name;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update group profiles when a new video is inserted
CREATE TRIGGER after_video_insert
AFTER INSERT ON videos
FOR EACH ROW
EXECUTE FUNCTION update_group_videos();